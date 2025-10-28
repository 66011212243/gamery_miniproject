import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatInput } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClient } from '@angular/common/http';
import { Games } from '../../services/api/games';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from '../../config/constants';
import { CartGetResponse } from '../../model/cart_get_res';

@Component({
  selector: 'app-add-cart-page',
  imports: [CommonModule, FormsModule, MatIconModule, MatSelectModule, MatInput, MatButtonModule, MatCheckboxModule],
  templateUrl: './add-cart-page.html',
  styleUrl: './add-cart-page.scss'
})
export class AddCartPage {
  apiUrl: string;
  constructor(private http: HttpClient, private gameService: Games,
    private router: Router, private route: ActivatedRoute, private constants: Constants) {
    this.apiUrl = this.constants.API_ENDPOINT;
  }

  userId!: number
  games: (CartGetResponse & { selected: boolean })[] = [];

  async ngOnInit() {
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    const data = await this.gameService.getCart(this.userId);
    // เพิ่ม selected property ให้ frontend ใช้กับ checkbox
    this.games = data.map(game => ({ ...game, selected: false }));
    console.log(this.games);
  }

  getSelectedGameIds(): number[] {
    return this.games.filter(g => g.selected).map(g => g.game_id);
  }

  gotoOrders() {
    const selectedIds = this.getSelectedGameIds();
    if (selectedIds.length === 0) {
      alert('กรุณาเลือกเกมก่อน');
      return;
    }
    this.router.navigate(['/orders-page'], { queryParams: { games: selectedIds.join(',') } });
  }

  async deleteCart(id: number) {
    const confirmDelete = confirm('คุณแน่ใจหรือไม่ว่าต้องการลบออกจากตระกร้า?');
    if (confirmDelete) {
      try {
        await this.gameService.
          deleteCart(id);
        console.log(id, 'ลบข้อมูลแล้ว');

        const currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl], { queryParams: { refresh: new Date().getTime() } });
        });
      } catch (error) {
        console.error('ลบไม่สำเร็จ', error);
      }

    }
  }
}
