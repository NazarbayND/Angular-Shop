import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product: any) {
    return this.db.list('/products').push(product);
  }

  getAll(): Observable<Product[]> {
    return this.db
      .list('/products')
      .snapshotChanges()
      .pipe(
        map((changes: any[]) =>
          changes.map((c: any) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  get(id: string) {
    return this.db.object('/products/' + id).valueChanges();
  }

  update(id: string, product: any) {
    this.db.list('/products/').update(id, product);
  }
  delete(id: string) {
    return this.db.list('/products/').remove(id);
  }
}
