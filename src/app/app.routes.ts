import { Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { PageNotFoundComponentComponent } from './Component/page-not-found-component/page-not-found-component.component';
import { LoginComponent } from './Component/login/login.component';
import { RegisterComponent } from './Component/register/register.component';
import { NavbarComponent } from './Component/navbar/navbar.component';
import { LayoutComponent } from './Component/layout/layout.component';
import { AboutMeComponent } from './Component/about-me/about-me.component';
import { ChatComponent } from './Component/chat/chat.component';
import { HangedComponent } from './Component/hanged/hanged.component';
import { CardsGameComponent } from './Component/cards-game/cards-game.component';

export type RoutesParams = 'login' | 'register' | 'home';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'layout', component: LayoutComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'aboutMe', component: AboutMeComponent },
  { path: 'hanged', component: HangedComponent },
  { path: 'cards', component: CardsGameComponent },
  { path: '**', component: PageNotFoundComponentComponent },
];
