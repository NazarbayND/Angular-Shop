import { switchMap } from 'rxjs/operators';
import { AuthService } from 'shared/services/auth/auth.service';
import { OrderService } from 'shared/services/order/order.service';
import { Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent implements OnInit {
  orders$: Observable<any[]> = of([]);

  constructor(private orderService: OrderService, private auth: AuthService) {}

  ngOnInit(): void {
    this.orders$ = this.auth.user$.pipe(
      switchMap((user) => {
        if (!user) return of([]);
        return this.orderService.getOrdersByUser(user.uid);
      })
    );
  }
}
