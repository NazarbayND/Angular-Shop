import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from 'shared/services/category/category.service';
import { Category } from 'app/shared/models/category';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent {
  category$: Observable<Category[]>;
  @Input('category') category: string | null = null;
  constructor(categoryService: CategoryService) {
    this.category$ = categoryService.getCategories();
  }
}
