import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'shared/models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}

  getCategories(): Observable<Category[]> {
    return this.db
      .list<Category>('/categories', (ref) => ref.orderByChild('name'))
      .snapshotChanges()
      .pipe(
        map((changes: any[]) =>
          changes.map((c: any) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }
}
