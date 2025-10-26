import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { Users } from '../../services/api/users';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';

import { UserGetRes } from '../../model/user_get_res';
import { Constants } from '../../config/constants';

@Component({
  selector: 'app-profile-admin',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterModule,],
  templateUrl: './profile-admin.html',
  styleUrl: './profile-admin.scss'
})
export class ProfileAdmin {
  apiUrl: string;
  constructor(private http: HttpClient, private userService: Users, private router: Router,
    private route: ActivatedRoute, private constants: Constants) {
    this.apiUrl = this.constants.API_ENDPOINT;
  }
  currentUser: any = null;
  userId!: number;

  user: UserGetRes | null = null;


  async ngOnInit() {
    this.userId = +this.route.snapshot.paramMap.get('id')!;

    this.user = await this.userService.getUserById(this.userId);

    console.log('user:', this.user);
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
