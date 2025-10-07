import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Users } from '../../services/api/users';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [MatButtonModule,
            CommonModule,
            FormsModule,
            MatCardModule,
            MatInputModule,
            MatFormFieldModule,
            MatIconModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss'
})
export class RegisterPage {
  constructor(private http: HttpClient, private userService : Users, private router: Router) {}
  username: string = '';
  email: string = '';
  password: string = '';
  status = "0";

  preview: string | ArrayBuffer | null = null;
  image: File | null = null;

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.image = selectedFile;

      const reader = new FileReader();
      reader.onload = (e) => this.preview = e.target!.result;
      reader.readAsDataURL(selectedFile);
    }
  }

  async register() {
    const formData = new FormData();
  formData.append('username', this.username);
  formData.append('email', this.email);
  formData.append('password', this.password);
  formData.append('image', this.image!);

  const user = await this.userService.register(formData);
  
  this.router.navigate(['/']);
  }

}
