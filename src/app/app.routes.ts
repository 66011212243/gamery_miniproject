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

export const routes: Routes = [

  { path: '', component: LoginPage },       // ไม่มี header
  { path: 'register-page', component: RegisterPage }, // ไม่มี header
  { path: 'login-page', component: LoginPage },  
  { path: 'profile-user/:id/edit-profile-user/:id', component: EditProfileUser},
  { path: 'profile-admin/:id/edit-profile-admin/:id', component: EditProfileAdmin},
  
  {
    path: '',
    component: AddHeader,
    children: [
      { path: 'homepage-user', component: HomepageUser },
      { path: 'homepage-admin', component: HomepageAdmin},
      { path: 'profile-admin', component: ProfileAdmin},
      { path: 'profile-user', component: ProfileUser},
      { path: 'profile-user/:id', component: ProfileUser},
      { path: 'profile-admin/:id', component: ProfileAdmin},
    ]
  },
  // { path: '**', redirectTo: '/' },
];
