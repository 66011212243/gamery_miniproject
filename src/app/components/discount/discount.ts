import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Games } from '../../services/api/games';
import { DiscountGetRes } from '../../model/discount_get_res';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-discount',
  imports: [CommonModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule],
  templateUrl: './discount.html',
  styleUrl: './discount.scss'
})
export class Discount {
  constructor(private http: HttpClient, private router: Router, private gameService: Games) { }

  codeName: string = '';
  discount: number = 0;
  maxUses: number = 0;

  discountCode : DiscountGetRes[] = []

  async ngOnInit() {
    this.discountCode = await this.gameService.getDiscount();
    console.log(this.discountCode);
  }

  async create() {
    console.log(this.codeName);
    console.log(this.discount);
    console.log(this.maxUses);
    await this.gameService.createDiscount(this.codeName, this.discount, this.maxUses);
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl], { queryParams: { refresh: new Date().getTime() } });
    });
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // discountCode = [
  //   { position: 'โค้ด A', name: '10%', weight: 100, symbol: 5 },
  //   { position: 'โค้ด B', name: '20%', weight: 50, symbol: 10 },
  //   { position: 'โค้ด C', name: '30%', weight: 30, symbol: 15 }
  // ];
}
