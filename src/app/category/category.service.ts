import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
export interface Categories {
  name: string;
  key: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}

  getCategories(): Observable<Categories[]> {
    return this.db
      .list<Categories>('/categories', (ref) => ref.orderByChild('name'))
      .valueChanges();
  }
}
