import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Users } from '../../services/api/users';

@Component({
  selector: 'app-login-page',
  imports: [MatButtonModule,
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage {
  constructor(private http: HttpClient, private userService : Users, private router: Router) {}
  email: string = '';
  password: string = '';

  async login() {
    const user = await this.userService.login(this.email, this.password)

    if(user && user.length > 0){
      const currentUser = user[0];

      if (currentUser.status === 1) {
        // admin
        this.router.navigate(['/homepage-admin']);
      } else {
        // user ปกติ
        this.router.navigate(['/homepage-user']);
      }

      // เก็บข้อมูล user ไว้ใน localStorage/sessionStorage ถ้าต้องการ
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      alert("Invalid email or password");
    }
    
  }
}
