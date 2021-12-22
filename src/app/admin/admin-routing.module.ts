import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'shared/services/auth-guard/auth-guard.service';

import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuardService } from './services/auth-guard/admin-auth-guard.service';

const routes: Routes = [
  {
    path: 'products/new',
    component: ProductFormComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService],
  },
  {
    path: 'products/:id',
    component: ProductFormComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService],
  },
  {
    path: 'products',
    component: AdminProductsComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService],
  },
  {
    path: 'orders',
    component: AdminOrdersComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService],
  },
  {
    path: 'orders/:id',
    component: OrderDetailsComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
