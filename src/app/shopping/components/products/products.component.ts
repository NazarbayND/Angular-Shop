import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { LoaderService } from 'app/loader/services/loader/loader.service';
import { ProductService } from 'shared/services/product/product.service';
import { ShoppingCartService } from 'shared/services/shopping-service/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchedProducts: Product[] = [];
  category: string | null = null;
  cart$: Observable<ShoppingCart | null> = of(null);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: ShoppingCartService,
    private loader: LoaderService
  ) {}

  async ngOnInit() {
    this.loader.setLoading(true);
    this.cart$ = await this.cartService.getCart();
    await this.populateProducts();
    // setTimeout(() => {
    //   this.loader.setLoading(false);
    // }, 2000);
  }

  async populateProducts() {
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
    this.search('');
  }

  search(query: string) {
    this.searchedProducts = query
      ? this.filteredProducts.filter((p) =>
          p.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        )
      : this.filteredProducts;
    this.loader.setLoading(false);
  }
}
