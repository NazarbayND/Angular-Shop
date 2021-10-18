import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { ProductService } from '../product/product.service';
import { ShoppingCartService } from '../shopping-service/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string | null = null;
  cart$: Observable<ShoppingCart | null> = of(null);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.populateProducts();
  }

  populateProducts() {
    this.productService
      .getAll()
      .pipe(
        switchMap((p) => {
          this.products = p;
          return this.route.queryParamMap;
        })
      )
      .subscribe((params) => {
        this.category = params.get('category');
        this.applyFilter();
      });
  }

  applyFilter() {
    this.filteredProducts = this.category
      ? this.products.filter((p) => p.category === this.category)
      : this.products;
  }
}
