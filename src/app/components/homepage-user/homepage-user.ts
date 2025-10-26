import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { Games } from '../../services/api/games';
import { GameTypeGetRes } from '../../model/gametype_get_res';
import { GameGetRes } from '../../model/game_get_res';
import { Constants } from '../../config/constants';
import { UserGetRes } from '../../model/user_get_res';
import { Users } from '../../services/api/users';

@Component({
  selector: 'app-homepage-user',
  imports: [CommonModule,FormsModule,RouterModule, NgbCarouselModule],
  templateUrl: './homepage-user.html',
  styleUrl: './homepage-user.scss'
})
export class HomepageUser {
  apiUrl: string;
    constructor(private http: HttpClient, private gameService: Games,
      private router: Router, private route: ActivatedRoute, private constants: Constants,
      private userService: Users) {
      this.apiUrl = this.constants.API_ENDPOINT;
      console.log(this.apiUrl);
    }

  gamestype: GameTypeGetRes[] = [];
  games: GameGetRes[] = [];

  userId!: number;
  user: UserGetRes | null = null;

  async ngOnInit() {
    this.gamestype = await this.gameService.getgameType();
    this.games = await this.gameService.getAllGames();
    console.log(this.games);

    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.user = await this.userService.getUserById(this.userId);

  }
  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  }
}
