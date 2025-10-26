import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Games } from '../../services/api/games';
import { GameGetRes } from '../../model/game_get_res';
import { Constants } from '../../config/constants';

@Component({
  selector: 'app-edit-game',
  imports: [CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule],
  templateUrl: './edit-game.html',
  styleUrl: './edit-game.scss'
})
export class EditGame {
  apiUrl: string;
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute,
    private constants: Constants, private gameService: Games) {
    this.apiUrl = this.constants.API_ENDPOINT;
  }

  image: File | null = null;
  preview: string | ArrayBuffer | null = null;
  name: string = '';
  price: number = 0;
  description: string = '';
  type_id: number = 0;

  game: GameGetRes[] = [];
  gameId!: number;

  type_games: TypeGame[] = [
    { value: 1, name: 'Action' },
    { value: 2, name: 'RPG' },
    { value: 3, name: 'Party Game' },
    { value: 4, name: 'Survival' },
    { value: 5, name: 'Horror' },
    { value: 6, name: 'Simulation' },
  ];

  async ngOnInit() {
    this.gameId = +this.route.snapshot.paramMap.get('id')!;
    this.game = await this.gameService.getGameById(this.gameId);
    console.log(this.game)

    this.name = this.game[0].name;
    this.type_id = this.game[0].type_id
    this.description = this.game[0].description
    this.price = this.game[0].price

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
  async savegame() {
    const formData = new FormData()
    formData.append('name', this.name);
    formData.append('type_id', this.type_id.toString());
    formData.append('description', this.description);
    formData.append('price', this.price.toString());
    if (this.image instanceof File) {
      formData.append('image', this.image!);
    }

    const user = await this.gameService.editGame(this.gameId, formData);

    this.router.navigate(['/details',this.gameId]);
  }
  cancel() {
    this.router.navigate(['/homepage-admin']);
  }
}

interface TypeGame {
  value: number;
  name: string;
}