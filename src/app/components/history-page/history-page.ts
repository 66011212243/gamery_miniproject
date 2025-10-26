import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Users } from '../../services/api/users';
import { Constants } from '../../config/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionGetRes } from '../../model/transaction_get_res';
import { UserGetRes } from '../../model/user_get_res';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-history-page',
  imports: [CommonModule,MatButtonModule],
  templateUrl: './history-page.html',
  styleUrl: './history-page.scss'
})
export class HistoryPage {
  apiUrl: string;
  constructor(private http: HttpClient, private userService: Users,
    private router: Router, private route: ActivatedRoute, private constants: Constants) {
    this.apiUrl = this.constants.API_ENDPOINT;
  }

  userId!: number;

  user: UserGetRes | null = null;
  transaction: TransactionGetRes[] = [];


  async ngOnInit() {
    this.userId = +this.route.snapshot.paramMap.get('id')!;

    this.transaction = await this.userService.getTransaction(this.userId);
  }

  back() {
    this.router.navigate([`/member-page`]);
  }
}
