import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { NgProgressModule } from 'ngx-progressbar';
import { LoaderService } from './services/loader/loader.service';

@NgModule({
  declarations: [LoaderComponent],
  imports: [CommonModule, NgProgressModule.withConfig({ spinner: false })],
  providers: [LoaderService],
  exports: [LoaderComponent],
})
export class LoaderModule {}
