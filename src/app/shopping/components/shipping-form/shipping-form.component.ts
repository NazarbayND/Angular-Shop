import { ShoppingCart } from 'shared/models/shopping-cart';
import { AuthService } from 'shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { OrderService } from 'shared/services/order/order.service';
import { Order } from 'shared/models/order';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss'],
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  userId: string = '';
  @Input('cart') cart: ShoppingCart | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async ngOnInit() {
    this.subscription = this.authService.user$.subscribe((user: any) =>
      user ? (this.userId = user.uid) : null
    );
  }

  async placeOrder(shipping: any) {
    if (!this.cart) return;

    let order = new Order(this.userId, shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }
}
