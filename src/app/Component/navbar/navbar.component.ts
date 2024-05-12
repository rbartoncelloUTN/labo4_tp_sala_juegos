import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { signOut } from 'firebase/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatSlideToggleModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private router: Router, public auth: Auth) {}

  handleClickGoToHome() {
    this.router.navigate(['home']);
  }

  handleClickGoToChat() {
    this.router.navigate(['chat']);
  }

  handleClickGoToAboutMe() {
    this.router.navigate(['aboutMe']);
  }

  handleLogout() {
    signOut(this.auth);
    this.router.navigate(['login']);
  }
}
