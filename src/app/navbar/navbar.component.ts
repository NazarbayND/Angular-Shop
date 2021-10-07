import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  appUser: AppUser | null = null;

  constructor(public auth: AuthService) {
    this.auth.appUser$.subscribe((user) => (this.appUser = user));
  }

  logout() {
    this.auth.logout();
  }
}
