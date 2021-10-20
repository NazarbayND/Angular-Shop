import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppUser } from 'shared/models/app-user';
import { UserService } from 'shared/services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User | null>;

  constructor(
    private auth: AngularFireAuth,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.user$ = this.auth.authState;
  }

  get appUser$(): Observable<AppUser | null> {
    return this.user$.pipe(
      switchMap((user) => {
        if (user) return this.userService.get(user.uid);

        return of(null);
      })
    );
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.auth.signOut();
  }
}
