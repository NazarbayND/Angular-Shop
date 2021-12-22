import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Order } from 'shared/models/order';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { OrderService } from 'shared/services/order/order.service';
import { UserService } from 'shared/services/user/user.service';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  faChevronLeft = faChevronLeft;
  id: string | null = null;
  order: Order | null = null;
  summary: { totalPrice: number; itemsCount: number } = {
    totalPrice: 0,
    itemsCount: 0,
  };
  user: any;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.orderService
        .getOrderById(this.id)
        .pipe(take(1))
        .subscribe((order) => {
          this.order = order;
          this.countSummary();
        });
    }
  }

  countSummary() {
    if (this.order) {
      this.summary = this.order.items.reduce(
        (acc, item) => {
          acc.totalPrice += item.totalPrice;
          acc.itemsCount += item.quantity;
          return acc;
        },
        {
          totalPrice: 0,
          itemsCount: 0,
        }
      );
      this.userService
        .get(this.order.userId)
        .pipe(take(1))
        .subscribe((user) => (this.user = user));
    }
  }
}
