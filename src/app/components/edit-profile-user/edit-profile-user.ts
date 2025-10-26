import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Users } from '../../services/api/users';
import { UserGetRes } from '../../model/user_get_res';
import { Constants } from '../../config/constants';

@Component({
  selector: 'app-edit-profile-user',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterModule,
    MatSelectModule, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './edit-profile-user.html',
  styleUrl: './edit-profile-user.scss'
})
export class EditProfileUser {
  apiUrl: string;
  constructor(private http: HttpClient, private userService: Users,
    private router: Router, private route: ActivatedRoute, private constants: Constants) {
    this.apiUrl = this.constants.API_ENDPOINT;
  }
  currentUser: any = null;
  username: string = '';
  image: File | null = null;

  preview: string | ArrayBuffer | null = null;

  userId!: number;

  user: UserGetRes | null = null;


  async ngOnInit() {
    this.userService.getProfile().subscribe({
      next: (res: any) => {
        this.currentUser = res.profile; // ข้อมูลจาก backend
        console.log('currentUser:', this.currentUser);
        this.userId = this.currentUser.user_id;
      },
      error: (err) => {
        if (err.status === 401) this.router.navigate(['/']);
      }

    });
    
    this.userId = +this.route.snapshot.paramMap.get('id')!;

    this.user = await this.userService.getUserById(this.userId);
    if (this.user) {
      this.username = this.user.username;
    }

    console.log('user:', this.user);
  }

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.image = selectedFile;

      const reader = new FileReader();
      reader.onload = (e) => this.preview = e.target!.result;
      reader.readAsDataURL(selectedFile);
    }
  }

  async saveProfile() {
    const formData = new FormData()
    formData.append('username', this.username);
    if (this.image instanceof File) {
      formData.append('image', this.image!);
    }

    const user_id = this.currentUser.user_id;


    const user = await this.userService.editProfile(user_id, formData);

    this.router.navigate(['/profile-user', this.currentUser.user_id]);

  }

  async cancle() {
    this.router.navigate(['/profile-user', this.currentUser.user_id]);
  }

}
