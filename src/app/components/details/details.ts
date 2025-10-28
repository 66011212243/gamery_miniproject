import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { Users } from '../../services/api/users';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from '../../config/constants';
import { Games } from '../../services/api/games';
import { GameGetRes } from '../../model/game_get_res';
import { RouterModule } from '@angular/router';
import { UserGetRes } from '../../model/user_get_res';
import { Checklibrarygetres } from '../../model/Check_library_get_res';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CheckCartGetResponse } from '../../model/chackCart_get_res';

@Component({
  selector: 'app-details',
  imports: [CommonModule, MatIconModule, MatInputModule, MatButtonModule, RouterModule],
  templateUrl: './details.html',
  styleUrl: './details.scss'
})
export class Details {
  apiUrl: string;
  constructor(private http: HttpClient, private userService: Users,
    private router: Router, private route: ActivatedRoute, private constants: Constants,
    private gameService: Games, private snackBar: MatSnackBar) {
    this.apiUrl = this.constants.API_ENDPOINT;
  }

  currentUser: any = null;
  userId!: number;
  game: GameGetRes[] = [];
  gameId!: number;
  user: UserGetRes | null = null;
  wallet: number = 0;
  walletUser?: number;
  transaction_type : number = 1;
  userLi : Checklibrarygetres[] =[];
  transaction_type: number = 1;
  check_cart: CheckCartGetResponse[] = [];

  bought = true;
  cart = true;

  async ngOnInit() {
    this.userService.getProfile().subscribe({
      next: async (res: any) => {
        this.currentUser = res.profile; // ข้อมูลจาก backend
        console.log('currentUser:', this.currentUser);
        this.userId = this.currentUser.user_id;
        
      },
      error: (err) => {
        if (err.status === 401) this.router.navigate(['/']);
      }
    });

    this.gameId = +this.route.snapshot.paramMap.get('id')!;
    this.game = await this.gameService.getGameById(this.gameId);
    console.log(this.game)

    this.user = await this.userService.getUserById(this.userId);
    console.log("details: ", this.user)
    this.walletUser = this.user?.wallet;
    console.log("wallet: ", this.walletUser)

    this.userLi = await this.gameService.userlibraryt(this.userId, this.gameId);
    console.log("userLi ",this.userLi);
    if (this.userLi.length > 0) {
      this.bought = true
    } else {
      this.bought = false;
    }
    


  }


  async onDelete(id: number) {
    const confirmDelete = confirm('คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?');
    if (confirmDelete) {
      try {
        await this.gameService.
          deleteGame(this.gameId);
        console.log(id, 'ลบข้อมูลแล้ว');

        this.router.navigate(['/homepage-admin']);
      } catch (error) {
        console.error('ลบไม่สำเร็จ', error);
      }

    }
  }

  async buyGame() {
    console.log("user: ", this.userId, "game :", this.gameId)
    if (this.walletUser) {
      this.wallet = this.walletUser - this.game[0].price;

      if (this.wallet < 0) {
        confirm('ยอดเงินของคุณไม่เพียงพอ');
      }
      else {
        // this.bought = false;
        this.bought = true; // ปุ่มซื้อหาย → ปุ่มเล่นเกมปรากฏ

        console.log("game: ",this.game[0].price)
        console.log("price: ",this.wallet,"bought: ",this.bought);
        this.bought = false;
        console.log("game: ", this.game[0].price)
        console.log("price: ", this.wallet, "bought: ", this.bought);
        await this.userService.addWallet(this.userId, this.wallet);

        await this.userService.addTransaction(this.userId, this.game[0].price, this.transaction_type);
      }
    }
  }

  
  async addCart() {
    this.check_cart = await this.gameService.chackCart(this.userId, this.gameId);
    console.log(this.check_cart);
    if (this.check_cart.length > 0) {
      this.snackBar.open('เกมนี้อยู่ในตะกร้าแล้ว!', 'ปิด', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }
    else {
      console.log("user: ", this.userId, "game :", this.gameId);
      await this.gameService.addCart(this.userId, this.gameId);
      this.snackBar.open('เพิ่มสินค้าลงตะกร้าแล้ว!', 'ปิด', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
    }
    
  }
}
