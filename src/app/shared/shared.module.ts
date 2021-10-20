import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FormsModule } from '@angular/forms';

import { OrdersComponent } from './components/orders/orders.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { AuthService } from './services/auth/auth.service';
import { CategoryService } from './services/category/category.service';
import { OrderService } from './services/order/order.service';
import { ProductService } from './services/product/product.service';
import { ShoppingCartService } from './services/shopping-service/shopping-cart.service';
import { UserService } from './services/user/user.service';

@NgModule({
  declarations: [
    OrdersComponent,
    ProductCardComponent,
    ProductQuantityComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService,
  ],
  exports: [
    OrdersComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    CommonModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
})
export class SharedModule {}
