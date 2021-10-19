import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  @Input('orders') orders: any[] = [];

  constructor() {}

  ngOnInit(): void {}
}
