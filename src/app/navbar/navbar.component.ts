import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-service/shopping-cart.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  appUser: AppUser | null = null;
  cart$: Observable<ShoppingCart | null> = of(null);
  constructor(
    public auth: AuthService,
    private cartService: ShoppingCartService
  ) {}
  async ngOnInit() {
    this.auth.appUser$.subscribe((user) => (this.appUser = user));

    this.cart$ = await this.cartService.getCart();
  }

  logout() {
    this.auth.logout();
  }
}
