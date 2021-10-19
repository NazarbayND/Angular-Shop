import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../order/order.service';
import { ShoppingCartService } from '../shopping-service/shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnInit, OnDestroy {
  cart: ShoppingCart | null = null;
  subscription: Subscription[] = [];
  userId: string = '';
  constructor(
    private router: Router,
    private authService: AuthService,
    private cartService: ShoppingCartService,
    private orderService: OrderService
  ) {}

  async ngOnInit() {
    let cart$ = await this.cartService.getCart();

    this.subscription.push(cart$.subscribe((cart) => (this.cart = cart)));
    this.subscription.push(
      this.authService.user$.subscribe((user) =>
        user ? (this.userId = user.uid) : null
      )
    );
  }

  async placeOrder(shipping: any) {
    if (!this.cart) return;

    let order = new Order(this.userId, shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
