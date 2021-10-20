import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-service/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input('product') product: Product | null = null;
  @Input('show-actions') showActions: boolean = false;
  @Input('shopping-cart') shoppingCart: ShoppingCart | null = null;

  constructor(private cartService: ShoppingCartService) {}

  addToCart() {
    if (!this.product) return;
    this.cartService.addToCart(this.product);
  }
}
