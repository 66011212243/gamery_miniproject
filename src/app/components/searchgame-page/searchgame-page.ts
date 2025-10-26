import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router,RouterModule } from '@angular/router';
import { Constants } from '../../config/constants';
import { Games } from '../../services/api/games';
import { GameGetRes } from '../../model/game_get_res';


@Component({
  selector: 'app-searchgame-page',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './searchgame-page.html',
  styleUrl: './searchgame-page.scss'
})
export class SearchgamePage {
  apiUrl: string;
  constructor(private http: HttpClient, private router: Router,private gameService: Games, 
    private route: ActivatedRoute, private constants: Constants) {
    this.apiUrl = this.constants.API_ENDPOINT;
  }
  currentUser: any = null;
  searchgame: string = '';
  getgames: GameGetRes[] = [];


  async ngOnInit() {
    this.searchgame = this.route.snapshot.paramMap.get('searchgame')!;
    console.log("searchgame : ",this.searchgame);
    this.getgames = await this.gameService.searchgame(this.searchgame);
    console.log("searchgame: ", this.getgames);

    
  }
}
