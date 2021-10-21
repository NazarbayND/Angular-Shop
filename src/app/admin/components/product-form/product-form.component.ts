import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'app/shared/models/category';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { CategoryService } from 'shared/services/category/category.service';
import { ProductService } from 'shared/services/product/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<Category[]>;
  product: any = {};

  id: string | null;
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categories$ = this.categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id)
      this.productService
        .get(this.id)
        .pipe(take(1))
        .subscribe((p: any) => (this.product = p));
  }

  ngOnInit(): void {}

  save(product: any) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }
  delete() {
    if (confirm('Are you sure to delete this product?') && this.id) {
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
  }
}
