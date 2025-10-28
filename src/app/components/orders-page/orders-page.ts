import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatInput } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { Games } from '../../services/api/games';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from '../../config/constants';
import { GameGetRes } from '../../model/game_get_res';
import { DiscountGetRes } from '../../model/discount_get_res';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserDiscountGetRes } from '../../model/user_discount_get_res';
import { Users } from '../../services/api/users';
import { UserGetRes } from '../../model/user_get_res';


@Component({
  selector: 'app-orders-page',
  imports: [CommonModule, FormsModule, MatIconModule, MatSelectModule, MatInput, MatButtonModule,],
  templateUrl: './orders-page.html',
  styleUrl: './orders-page.scss'
})
export class OrdersPage {
  apiUrl: string;
  constructor(private http: HttpClient, private gameService: Games,
    private router: Router, private route: ActivatedRoute, private constants: Constants,
    private snackBar: MatSnackBar, private userService: Users) {
    this.apiUrl = this.constants.API_ENDPOINT;
  }
  user: UserGetRes | null = null;
  wallet: number = 0;
  walletUser?: number;
  transaction_type: number = 1;
  currentUser: any = null;
  userId!: number;
  selectedGameIds: number[] = [];
  orderGame: GameGetRes[] = [];
  totalprice: number = 0;
  discountName: string = '';
  totaldiscount: number = 0;
  discount: number = 0;

  userDiscount: UserDiscountGetRes[] = [];

  bt = true;

  dt: DiscountGetRes[] = [];
  async ngOnInit() {
    this.userService.getProfile().subscribe({
      next: async (res: any) => {
        this.currentUser = res.profile;
        console.log('currentUser:', this.currentUser);
        this.userId = this.currentUser.user_id;

        // ✅ ตอนนี้มี userId แล้ว ค่อยดึงข้อมูล user ได้
        this.user = await this.userService.getUserById(this.userId);
        console.log("details: ", this.user);
        this.walletUser = this.user?.wallet;
        console.log("wallet: ", this.walletUser);

        // ✅ โหลดเกมที่เลือก
        this.route.queryParams.subscribe(async params => {
          if (params['games']) {
            this.selectedGameIds = params['games'].split(',').map((id: string) => +id);
            console.log('เกมที่เลือก:', this.selectedGameIds);

            this.orderGame = await this.gameService.orderGame(this.selectedGameIds);
            console.log(this.orderGame);

            this.totalprice = this.orderGame.reduce((sum, game) => sum + game.price, 0);
            console.log('รวมราคา:', this.totalprice);
          }
        });
      },
      error: (err) => {
        if (err.status === 401) this.router.navigate(['/']);
      }
    });
  }


  async addCode() {
    console.log(this.discountName)
    this.dt = await this.gameService.getDiscountByname(this.discountName);

    if (this.dt.length > 0) {
      this.userDiscount = await this.gameService.userDiscount(this.userId, this.dt[0].code_id);
      if (this.userDiscount.length > 0) {
        this.snackBar.open('คุณใช้โค้ดไปแล้ว!', 'ปิด', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      }
      else {
        await this.gameService.adduserDiscount(this.userId, this.dt[0].code_id);
        this.discount = this.dt[0].discount;
        console.log(this.discount);
        this.totaldiscount = this.totalprice * (this.discount / 100);
        this.totalprice = this.totalprice - this.totaldiscount;
        console.log(this.totalprice);
      }
    } else {
      this.snackBar.open('ไม่มีโค้ดส่วนลดนี้!', 'ปิด', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }



  }

  async buyGame() {
    console.log("ซื้อออ");

    if (this.walletUser) {
      this.wallet = this.walletUser - this.totalprice;

      if (this.wallet < 0) {
        confirm('ยอดเงินของคุณไม่เพียงพอ');
      }
      try {
        // 1️⃣ อัปเดตยอดเงินใน wallet
        await this.userService.addWallet(this.userId, this.wallet);

        // 2️⃣ เพิ่ม transaction
        await this.userService.addTransaction(this.userId, this.totalprice, this.transaction_type);

        // 3️⃣ ดึง discountId (ถ้ามี)
        const discountId = this.dt?.[0]?.code_id ?? undefined;

        // 4️⃣ เพิ่มออเดอร์เกม
        await this.gameService.addOrderGame(
          this.userId,
          this.totalprice,
          this.selectedGameIds, // ต้องเป็น array
          discountId
        );

        alert('ซื้อเกมสำเร็จ!');
        this.router.navigate(['/homepage-user', this.userId]);
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการซื้อเกม:', error);
        alert('ไม่สามารถทำรายการได้ กรุณาลองใหม่อีกครั้ง');
      }

    }
  }
}

