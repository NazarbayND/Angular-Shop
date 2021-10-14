import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  private create() {
    return this.db.list('/shopping-carts').push({
      dataCreated: new Date().getTime(),
    });
  }

  async getCart(): Promise<Observable<ShoppingCart | null>> {
    let cartId = await this.getOrCreateCart();
    return this.db
      .object<ShoppingCart>('/shopping-carts/' + cartId)
      .valueChanges()
      .pipe(map((cart) => (cart ? new ShoppingCart(cart.items) : null)));
  }

  private async getOrCreateCart() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    const result = await this.create();
    if (result.key) {
      localStorage.setItem('cartId', result.key);
      return result.key;
    } else return null;
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async updateItemQuantity(product: Product, change: number) {
    try {
      let cartId = await this.getOrCreateCart();
      if (!cartId) return;

      let item$ = this.getItem(cartId, product.key);
      item$
        .valueChanges()
        .pipe(take(1))
        .subscribe((item: any) => {
          item$.update({
            product: product,
            quantity: (item?.quantity || 0) + change,
          });
        });
    } catch (error) {}
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }
}
