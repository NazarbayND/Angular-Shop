import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-service/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input('product') product: Product | null = null;
  @Input('show-actions') showActions: boolean = false;
  @Input('shopping-cart') shoppingCart: any;

  constructor(private cartService: ShoppingCartService) {}

  addToCart() {
    if (!this.product) return;
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    if (!this.product) return;
    this.cartService.removeFromCart(this.product);
  }
  getQuantity() {
    if (!this.product || !this.shoppingCart) return 0;

    let item = this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0;
  }
}
