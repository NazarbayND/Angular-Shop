import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Categories, CategoryService } from 'src/app/category/category.service';
import { ProductService } from 'src/app/product/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<Categories[]>;

  constructor(
    categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.categories$ = categoryService.getCategories();
  }

  ngOnInit(): void {}

  save(product: any) {
    this.productService.create(product);
  }
}
