import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Users } from '../../services/api/users';
import { UserGetRes } from '../../model/user_get_res';
import { Constants } from '../../config/constants';
import { TransactionGetRes } from '../../model/transaction_get_res';

@Component({
  selector: 'app-profile-user',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterModule,],
  templateUrl: './profile-user.html',
  styleUrl: './profile-user.scss'
})
export class ProfileUser implements OnInit {
  apiUrl: string;
  constructor(private http: HttpClient, private userService: Users,
    private router: Router, private route: ActivatedRoute, private constants: Constants) {
    this.apiUrl = this.constants.API_ENDPOINT;
  }
  currentUser: any = null;
  userId!: number;

  user: UserGetRes | null = null;
  transaction : TransactionGetRes[] = [];


  async ngOnInit() {
    this.userId = +this.route.snapshot.paramMap.get('id')!;

    this.user = await this.userService.getUserById(this.userId);
    console.log('user:', this.user);

    this.transaction = await this.userService.getTransaction(this.userId);
  }

  async logout() {
    try {
      await this.userService.logout();
      // ลบข้อมูลใน localStorage (ถ้ามี)
      localStorage.removeItem('currentUser');
      // ไปหน้า login
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Logout failed', error);
    }
  }
}
