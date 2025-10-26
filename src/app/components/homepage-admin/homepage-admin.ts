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


@Component({
  selector: 'app-homepage-admin',
  imports: [CommonModule, FormsModule, RouterModule, NgbCarouselModule],
  templateUrl: './homepage-admin.html',
  styleUrl: './homepage-admin.scss'
})
export class HomepageAdmin {
  apiUrl: string;
  constructor(private http: HttpClient, private gameService: Games,
    private router: Router, private route: ActivatedRoute, private constants: Constants) {
    this.apiUrl = this.constants.API_ENDPOINT;
  }

  gamestype: GameTypeGetRes[] = [];
  games: GameGetRes[] = [];

  async ngOnInit() {
    this.gamestype = await this.gameService.getgameType();
    this.games = await this.gameService.getAllGames();

    console.log(this.games);


  }
  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  }


}
