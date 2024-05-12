import { AngularFireAuth } from '@angular/fire/compat/auth';
import { first } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {}

  isLoggedIn(): any {
    return this.afAuth.authState.pipe(first()).subscribe(user => {
      return !!user;
    });
  }
}
