import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesParams } from '../../app.routes';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, MatSlideToggleModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  newUserMail: string = '';
  newUserPWD: string = '';
  numberOne!: number | undefined;

  loggedUser: string = '';
  flagError: boolean = false;
  msjError: string = '';

  constructor(private router: Router, public auth: Auth) {}
  isRightPanelActive: boolean = false;

  signUp(event: Event): void {
    event.preventDefault();
    createUserWithEmailAndPassword(this.auth, this.newUserMail, this.newUserPWD)
      .then((res) => {
        if (res.user.email !== null) this.loggedUser = res.user.email;

        this.flagError = false;
        this.router.navigate(['home']);
      })
      .catch((e) => {
        this.flagError = true;
        switch (e.code) {
          case 'auth/invalid-email':
            this.msjError = 'Email invalido';
            break;
          case 'auth/email-already-in-use':
            this.msjError = 'Email ya en uso';
            break;
          default:
            this.msjError = e.code;
            break;
        }
      });
  }
  goTo(path: RoutesParams) {
    this.router.navigate([path]);
  }
}
