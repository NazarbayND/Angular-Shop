import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { Product, UserComment } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { AuthService } from 'shared/services/auth/auth.service';
import { CommentService } from 'shared/services/comment/comment.service';
import { ProductService } from 'shared/services/product/product.service';
import { ShoppingCartService } from 'shared/services/shopping-service/shopping-cart.service';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  faChevronLeft = faChevronLeft;
  id: string | null = null;
  product: Product | null = null;
  user: any;
  comments$: Observable<UserComment[]> = new Observable();
  text: string = '';
  cart$: Observable<ShoppingCart | null> = new Observable();
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private auth: AuthService,
    private commentService: CommentService,
    private cartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.cart$ = await this.cartService.getCart();
    if (this.id) {
      this.productService
        .get(this.id)
        .pipe(take(1))
        .subscribe((p: any) => {
          this.product = {
            ...p,
            key: this.id,
          };
        });

      this.auth.appUser$.pipe(take(1)).subscribe((user: any) => {
        this.user = user;
      });

      this.comments$ = this.commentService.get(this.id);
    } else this.router.navigate(['/']);
  }

  addComment() {
    const newComment = {
      username: this.user.name,
      text: this.text,
      date: new Date().getTime(),
    };
    if (this.id) {
      this.commentService.create(this.id, newComment);
    }
    this.text = '';
  }
  addToCart() {
    if (!this.product) return;
    this.cartService.addToCart(this.product);
  }
}
