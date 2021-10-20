import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [NavbarComponent, HomeComponent, LoginComponent],
  imports: [
    CommonModule,
    NgbModule,
    FontAwesomeModule,
    RouterModule.forChild([{ path: 'login', component: LoginComponent }]),
  ],
  exports: [NavbarComponent],
})
export class CoreModule {}
