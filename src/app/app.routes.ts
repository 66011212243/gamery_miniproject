import { Routes } from '@angular/router';
import { LoginPage } from './components/login-page/login-page';
import { RegisterPage } from './components/register-page/register-page';
import { AddHeader } from './components/add-header/add-header';
import { HomepageUser } from './components/homepage-user/homepage-user';
import { HomepageAdmin } from './components/homepage-admin/homepage-admin';
import { ProfileAdmin } from './components/profile-admin/profile-admin';
import { ProfileUser } from './components/profile-user/profile-user';
import { EditProfileUser } from './components/edit-profile-user/edit-profile-user';
import { EditProfileAdmin } from './components/edit-profile-admin/edit-profile-admin';
import { AddWallet } from './components/add-wallet/add-wallet';
import { CreateGame } from './components/create-game/create-game';
import { Details } from './components/details/details';
import { EditGame } from './components/edit-game/edit-game';
import { MemberPage } from './components/member-page/member-page';
import { HistoryPage } from './components/history-page/history-page';
import { SearchgamePage } from './components/searchgame-page/searchgame-page';
import { Discount } from './components/discount/discount';
import { EditDiscount } from './components/edit-discount/edit-discount';
import { Library } from './components/library/library';

export const routes: Routes = [

  { path: '', component: LoginPage },       // ไม่มี header
  { path: 'register-page', component: RegisterPage }, // ไม่มี header
  { path: 'login-page', component: LoginPage },  
  { path: 'profile-user/:id/edit-profile-user/:id', component: EditProfileUser},
  { path: 'profile-admin/:id/edit-profile-admin/:id', component: EditProfileAdmin},
  { path: 'profile-user/:id/add-wallet/:id', component: AddWallet},
  { path: 'create-game', component: CreateGame },  
  { path: 'details/:id/edit-game/:id', component: EditGame},
  { path: 'history-page/:id', component: HistoryPage},
   { path: 'edit-discount/:id', component: EditDiscount},
  
  {
    path: '',
    component: AddHeader,
    children: [
      { path: 'homepage-user/:id', component: HomepageUser },
      { path: 'homepage-admin', component: HomepageAdmin},
      { path: 'profile-admin', component: ProfileAdmin},
      { path: 'profile-user', component: ProfileUser},
      { path: 'profile-user/:id', component: ProfileUser},
      { path: 'profile-admin/:id', component: ProfileAdmin},
      { path: 'details/:id', component: Details},
      { path: 'member-page', component: MemberPage},
      { path: 'searchgame-page/:searchgame', component: SearchgamePage},
      { path: 'discount', component: Discount},
      { path: 'library/:id', component: Library},
      
    ]
  },
  // { path: '**', redirectTo: '/' },
];
