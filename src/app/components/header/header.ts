import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { Users } from '../../services/api/users';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { UserGetRes } from '../../model/user_get_res';
import { Constants } from '../../config/constants';
import { MatButtonModule } from '@angular/material/button';
import { GameGetRes } from '../../model/game_get_res';
import { Games } from '../../services/api/games';
import {MatCardModule} from '@angular/material/card';
import { GameTypeGetRes } from '../../model/gametype_get_res';

@Component({
  selector: 'app-header',
  imports: [CommonModule, MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    MatButtonModule,
    FormsModule,MatCardModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  apiUrl: string;
  constructor(private http: HttpClient, private userService: Users,
    private router: Router, private route: ActivatedRoute,
    private constants: Constants, private gameService: Games) {
    this.apiUrl = this.constants.API_ENDPOINT;
  }
  currentUser: any = null;
  userId!: number;
  user: UserGetRes | null = null;

  getgames: GameGetRes[] = [];
  searchgame: string = '';


  async ngOnInit() {
    this.userService.getProfile().subscribe({
      next: async (res: any) => {
        this.currentUser = res.profile; // ข้อมูลจาก backend
        console.log('currentUser:', this.currentUser);
        this.userId = this.currentUser.user_id;
        this.user = await this.userService.getUserById(this.userId);
        console.log('id ', this.userId);
        console.log('user:', this.user);
      },
      error: (err) => {
        if (err.status === 401) this.router.navigate(['/']);
      }
    });

  }

  goToProfile() {
    if (this.currentUser.status === 1) {
      this.router.navigate(['/profile-admin', this.userId]); // ไปหน้าโปรไฟล์ของแอดมิน
    } else {
      this.router.navigate(['/profile-user', this.userId]); // ไปหน้าโปรไฟล์ของผู้ใช้ทั่วไป
    }
  }

  async search() {
    // console.log("searchgame : ",this.searchgame);
    // this.getgames = await this.gameService.searchgame(this.searchgame);
    // console.log("searchgame: ", this.getgames);
      this.router.navigate(['/searchgame-page', this.searchgame]);
  }
}
