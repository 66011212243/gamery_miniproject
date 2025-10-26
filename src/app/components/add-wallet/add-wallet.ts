import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from "@angular/material/icon";
import {MatButtonModule} from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { Users } from '../../services/api/users';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from '../../config/constants';
import { UserGetRes } from '../../model/user_get_res';

@Component({
  selector: 'app-add-wallet',
  imports: [CommonModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,],
  templateUrl: './add-wallet.html',
  styleUrl: './add-wallet.scss'
})
export class AddWallet {
  constructor(private http: HttpClient, private userService: Users,
    private router: Router, private route: ActivatedRoute, private constants: Constants) {
  }
  currentUser: any = null;
  userId!: number;
  addcoin : number = 0;

  user: UserGetRes | null = null;
  showCustomAmount = false; 
  selectedAmount: number | null = null; 
  transaction_type : number = 2;

  async ngOnInit() {
    this.userId = +this.route.snapshot.paramMap.get('id')!;

    this.user = await this.userService.getUserById(this.userId);

    console.log('user:', this.user);
  }

 openCustomAmount() {
    console.log('เปิด popup'); // ✅ ทดสอบว่า method ทำงาน
    this.showCustomAmount = true;
  }


  closeCustomAmount() {
    this.showCustomAmount = false;
  }
  selectAmount(amount: number) {
    this.selectedAmount = amount;
  }

  async confirmCoin() {
    if (this.selectedAmount !==null) {
      if (this.user) {
        this.addcoin = this.user.wallet + this.selectedAmount;
        console.log("wallet : ", this.user?.wallet);
        console.log("coin : ", this.selectedAmount);
        console.log("sum : ", this.addcoin);

        const addWallet = await this.userService.addWallet(this.userId, this.addcoin);
        await this.userService.addTransaction(this.userId, this.selectedAmount,this.transaction_type);
        this.user.wallet = this.addcoin;
      }
      this.selectedAmount = null;
      this.showCustomAmount = false;
    }
  }

  backprofile() {
    this.router.navigate([`/profile-user/${this.userId}`]);
  }
}
