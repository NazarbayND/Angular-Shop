import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuardService } from './services/auth-guard/admin-auth-guard.service';

@NgModule({
  declarations: [
    AdminOrdersComponent,
    AdminProductsComponent,
    ProductFormComponent,
    OrderDetailsComponent,
  ],
  providers: [AdminAuthGuardService],
  imports: [
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    AdminRoutingModule,
  ],
})
export class AdminModule {}
