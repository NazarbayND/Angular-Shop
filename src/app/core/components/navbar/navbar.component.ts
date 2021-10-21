import { Component, OnInit } from '@angular/core';
import { faLeaf, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Observable, of } from 'rxjs';
import { AppUser } from 'shared/models/app-user';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { AuthService } from 'shared/services/auth/auth.service';
import { ShoppingCartService } from 'shared/services/shopping-service/shopping-cart.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  faLeaf = faLeaf;
  faShoppingCart = faShoppingCart;

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
