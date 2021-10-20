import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-service/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss'],
})
export class ProductQuantityComponent {
  @Input('product') product: Product | null = null;
  @Input('shopping-cart') shoppingCart: ShoppingCart | null = null;

  constructor(private cartService: ShoppingCartService) {}

  addToCart() {
    if (!this.product) return;
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    if (!this.product) return;
    this.cartService.removeFromCart(this.product);
  }
}
