import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { RoutesParams } from '../../app.routes';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
} from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public loginsCollection: any[] = [];
  public user: string = '';
  public countLogins: number = 0;

  userMail: string = '';
  userPWD: string = '';

  loggedUser: string = '';
  flagError: boolean = false;
  msjError: string = '';

  constructor(
    private router: Router,
    public auth: Auth,
    private firestore: Firestore
  ) {}

  goTo(path: RoutesParams) {
    this.router.navigate([path]);
  }

  predefinedData = {
    email: 'test2@test.com',
    password: '123456',
  };

  login(e: Event): void {
    e.preventDefault();
    signInWithEmailAndPassword(this.auth, this.userMail, this.userPWD)
      .then((res) => {
        if (res.user.email !== null) this.loggedUser = res.user.email;

        this.flagError = false;
        let col = collection(this.firestore, 'logins');
        addDoc(col, { fecha: new Date(), user: this.loggedUser });
        localStorage.setItem('user', this.loggedUser);
        this.router.navigate(['home']);
      })
      .catch((e) => {
        this.flagError = true;
        switch (e.code) {
          case 'auth/invalid-email':
            this.msjError = 'Email invalido';
            break;
          case 'auth/invalid-credential':
            this.msjError = 'Email o contraseña incorrecto';
            break;
          default:
            this.msjError = e.code;
            break;
        }
      });
  }
  autoComplete(event: Event): void {
    event.preventDefault();
    this.userMail = this.predefinedData.email;
    this.userPWD = this.predefinedData.password;
  }
}
