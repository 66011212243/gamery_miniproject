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

  // ปุ่มแก้ไขในตาราง
edit(row: DiscountGetRes) {
  this.router.navigate(['/edit-discount', row.code_id], { state: { discount: row } });
}

  async onDeleteDiscount(id: number) {
  const confirmDelete = confirm('คุณต้องการที่จะลบใช่หรือไม่');
  if (!confirmDelete) return;

  try {
    await this.gameService.deleteDiscount(id); // เรียก API ลบ
    alert('ลบสำเร็จ!');
    // โหลดข้อมูลใหม่เพื่อรีเฟรชตาราง
    this.discountCode = await this.gameService.getDiscount();
  } catch (error) {
    console.error(error);
    alert('เกิดข้อผิดพลาดในการลบ');
  }
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

  displayedColumns: string[] = ['name', 'discount', 'max_uses','used_count','actions'];
 
}