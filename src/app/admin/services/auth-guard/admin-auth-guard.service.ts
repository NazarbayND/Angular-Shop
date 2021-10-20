import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from 'shared/services/auth/auth.service';
import { map } from 'rxjs/operators';
import { UserService } from 'shared/services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private userService: UserService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.auth.appUser$.pipe(
      map((appUser) => {
        if (appUser) return appUser.isAdmin;
        return false;
      })
    );
  }
}
