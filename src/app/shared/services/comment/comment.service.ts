import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserComment } from 'shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private db: AngularFireDatabase) {}

  get(id: string): Observable<UserComment[]> {
    return this.db
      .list('/comments/' + id)
      .valueChanges()
      .pipe(
        map((c: any) => {
          return c as UserComment[];
        })
      );
  }

  create(id: string, comment: UserComment) {
    return this.db.list('/comments/' + id).push(comment);
  }
}
