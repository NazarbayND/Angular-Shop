import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnDestroy {
  @ViewChild(MatPaginator) set paginator(pager: MatPaginator) {
    if (pager) this.dataSource.paginator = pager;
  }

  @ViewChild(MatSort) set sort(sorter: MatSort) {
    if (sorter) this.dataSource.sort = sorter;
  }

  products: Product[] = [];
  subscription: Subscription;
  displayedColumns: string[] = ['title', 'price', 'edit'];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>();

  constructor(private productService: ProductService) {
    this.subscription = this.productService
      .getAll()
      .subscribe((product: Product[]) => {
        this.dataSource.data = this.products = product;
      });
  }

  filter(query: string) {
    this.dataSource.data = query
      ? this.products.filter((p) =>
          p.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        )
      : this.products;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
