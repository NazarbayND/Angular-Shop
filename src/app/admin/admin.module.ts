import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from 'shared/services/auth-guard/auth-guard.service';
import { SharedModule } from 'shared/shared.module';

import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuardService } from './services/auth-guard/admin-auth-guard.service';

@NgModule({
  declarations: [
    AdminOrdersComponent,
    AdminProductsComponent,
    ProductFormComponent,
  ],
  providers: [AdminAuthGuardService],
  imports: [
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    RouterModule.forChild([
      {
        path: 'admin/products/new',
        component: ProductFormComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService],
      },
      {
        path: 'admin/products/:id',
        component: ProductFormComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService],
      },
      {
        path: 'admin/products',
        component: AdminProductsComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService],
      },
      {
        path: 'admin/orders',
        component: AdminOrdersComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService],
      },
    ]),
  ],
})
export class AdminModule {}
