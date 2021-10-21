import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OrderService } from 'shared/services/order/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
})
export class AdminOrdersComponent implements OnInit {
  orders$: Observable<any[]> = of([]);
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orders$ = this.orderService.getOrders();
  }
}
