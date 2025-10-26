import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Games } from '../../services/api/games';

@Component({
  selector: 'app-create-game',
  imports: [CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule],
  templateUrl: './create-game.html',
  styleUrl: './create-game.scss'
})
export class CreateGame {
  constructor(private http: HttpClient, private router: Router,private gameService: Games) { }
  preview: string | ArrayBuffer | null = null;

  name: string = '';
  price: number = 0;
  description: string = '';
  image: File | null = null;
  type_id: number = 0;

  type_games: TypeGame[] = [
    { value: 1, name: 'Action' },
    { value: 2, name: 'RPG' },
    { value: 3, name: 'Party Game' },
    { value: 4, name: 'Survival' },
    { value: 5, name: 'Horror' },
    { value: 6, name: 'Simulation' },
  ];

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.image = selectedFile;

      const reader = new FileReader();
      reader.onload = (e) => this.preview = e.target!.result;
      reader.readAsDataURL(selectedFile);
    }
  }

  async create() {
    const formData = new FormData();
  formData.append('name', this.name);
  formData.append('type_id', this.type_id.toString());
  formData.append('description', this.description);
  formData.append('price', this.price.toString());
  formData.append('image', this.image!);

  const user = await this.gameService.createGame(formData);
  
  this.router.navigate(['/homepage-admin']);
  }

  cancel() {
    this.router.navigate(['/homepage-admin']);
  }
}

interface TypeGame {
  value: number;
  name: string;
}