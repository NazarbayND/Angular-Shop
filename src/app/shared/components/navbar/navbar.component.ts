import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          pointerEvents: 'all',
          transform: 'translateY(0)',
          opacity: '1',
        })
      ),
      state(
        'closed',
        style({
          pointerEvents: 'none',
          transform: 'translateY(-10%)',
          opacity: '0',
        })
      ),
      transition('open => closed', [animate('0.5s ease-out')]),
      transition('closed => open', [animate('0.5s ease-in')]),
      transition('* => open', [animate('0.5s ease-out')]),
    ]),
  ],
})
export class NavbarComponent implements OnInit {
  faLeaf = faLeaf;
  faShoppingCart = faShoppingCart;

  appUser: AppUser | null = null;
  cart$: Observable<ShoppingCart | null> = of(null);
  isOpen = false;

  constructor(
    public auth: AuthService,
    private cartService: ShoppingCartService,
    private router: Router
  ) {}
  async ngOnInit() {
    this.auth.appUser$.subscribe((user) => (this.appUser = user));

    this.cart$ = await this.cartService.getCart();
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['']);
  }
}
