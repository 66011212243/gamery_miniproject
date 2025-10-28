import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Games } from '../../services/api/games';
import { DiscountGetRes } from '../../model/discount_get_res';
import { MatTableModule } from '@angular/material/table';
import { Constants } from '../../config/constants';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-edit-discount',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
  ],
  templateUrl: './edit-discount.html',
  styleUrls: ['./edit-discount.scss'],
})
export class EditDiscount implements OnInit {
  apiUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private constants: Constants,
    private gameService: Games // อาจเปลี่ยนชื่อเป็น DiscountService ก็ได้
  ) {
    this.apiUrl = this.constants.API_ENDPOINT;
  }

  code_name: string = '';
  discount: number = 0;
  max_uses: number = 0;

  discountData: DiscountGetRes[] = [];
  discountId!: number;

 async ngOnInit() {
  this.discountId = +this.route.snapshot.paramMap.get('id')!;

  // ดึงทุกคูปอง
  const allDiscounts = await this.gameService.getDiscount();

  // กรองตาม code_id
  const discount = allDiscounts.find(d => d.code_id === this.discountId);

  if (discount) {
    this.code_name = discount.code_name;
    this.discount = discount.discount;
    this.max_uses = discount.max_uses;
  }

  console.log(discount);
}

  async saveDiscount() {
 const payload = {
  code_name: this.code_name,
  discount: this.discount,
  max_uses: this.max_uses  
};


  try {
    const response = await lastValueFrom(
      this.http.put(`${this.constants.API_ENDPOINT}/editdiscount/${this.discountId}`, payload)
    );
    console.log("PUT success:", response);
    this.router.navigate(['/discount']); 
  } catch (error) {
    console.error("PUT failed:", error);
  }
}

}
