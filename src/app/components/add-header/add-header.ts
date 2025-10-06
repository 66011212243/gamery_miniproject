import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Header } from "../header/header";
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-add-header',
  imports: [Header,
            RouterModule ],
  templateUrl: './add-header.html',
  styleUrl: './add-header.scss'
})
export class AddHeader {
  constructor(private router: Router) {}
}
