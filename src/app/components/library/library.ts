import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Games } from '../../services/api/games';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute,  } from '@angular/router'
import { Users } from '../../services/api/users';
import { Constants } from '../../config/constants';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-library',
  imports: [CommonModule,FormsModule,MatIconModule,MatInputModule,MatButtonModule,MatCardModule,MatTableModule,RouterModule],
  templateUrl: './library.html',
  styleUrl: './library.scss'
})
export class Library implements OnInit{
  apiUrl: string;
      constructor(private http: HttpClient, private gameService: Games,
        private router: Router, private route: ActivatedRoute, private constants: Constants,
        private userService: Users) {
        this.apiUrl = this.constants.API_ENDPOINT;
        console.log(this.apiUrl);
      }
    userId!: number;
  libraryGames: any[] = [];


  async ngOnInit() {
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    await this.loadLibrary();
  }

  async loadLibrary() {
    try {
      this.libraryGames = await this.gameService.getUserLibrary(this.userId);
      console.log(' User Library:', this.libraryGames);
    } catch (err) {
      console.error(' Error loading library:', err);
    }
  }
}
