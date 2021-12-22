import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from 'shared/services/order/order.service';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  @Input('orders') orders: any[] = [];

  constructor(private orderService: OrderService) {}

  delete(key: string) {
    if (confirm('Are you sure to delete this order?')) {
      this.orderService.deleteOrder(key);
    }
  }
  ngOnInit(): void {}
}
