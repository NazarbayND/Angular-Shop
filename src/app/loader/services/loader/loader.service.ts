import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loading = new BehaviorSubject<boolean>(false);

  getLoading() {
    return this.loading.asObservable();
  }
  setLoading(loading: boolean) {
    this.loading.next(loading);
  }
  constructor() {}
}
