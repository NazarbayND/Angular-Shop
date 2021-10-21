import { Component, Input } from '@angular/core';
import { Category } from 'app/shared/models/category';
import { Observable } from 'rxjs';
import { CategoryService } from 'shared/services/category/category.service';

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
