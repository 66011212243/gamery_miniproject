import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginPage } from "./components/login-page/login-page";
import { RegisterPage } from "./components/register-page/register-page";
import { HomepageUser } from "./components/homepage-user/homepage-user";
import { Header } from "./components/header/header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginPage, RegisterPage, HomepageUser, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'mini_project';
}
