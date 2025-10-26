import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Users } from '../../services/api/users';
import { MemberGetRes } from '../../model/member_get_res';

@Component({
  selector: 'app-member-page',
  imports: [CommonModule,MatTableModule],
  templateUrl: './member-page.html',
  styleUrl: './member-page.scss'
})
export class MemberPage {
  constructor(private http: HttpClient, private userService: Users, private router: Router) {}
   displayedColumns: string[] = ['no', 'name', 'email'];

  member: MemberGetRes[] = [];
  
 async ngOnInit() {
    try {
      this.member = await this.userService.member();
      console.log(this.member);
    } catch (err) {
      console.error('Error fetching member:', err);
    }
  }

  member_history (element: MemberGetRes) {
    console.log("user..", element)
    this.router.navigate(['/history-page',element]);
  }
}
