import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from '../models/product';
import { ProductService } from '../product/product.service';
import { ShoppingCartService } from '../shopping-service/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string | null = null;
  cart: any;
  subscription: Subscription = new Subscription();

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private cartService: ShoppingCartService
  ) {
    productService
      .getAll()
      .pipe(
        switchMap((p) => {
          this.products = p;
          return route.queryParamMap;
        })
      )
      .subscribe((params) => {
        this.category = params.get('category');

        this.filteredProducts = this.category
          ? this.products.filter((p) => p.category === this.category)
          : this.products;
      });
  }

  async ngOnInit() {
    this.subscription = (await this.cartService.getCart()).subscribe(
      (cart) => (this.cart = cart)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
