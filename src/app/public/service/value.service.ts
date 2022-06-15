import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValueService {

  private value: string = 'my name';

  constructor() { }

  getValue(): string {
    return this.value;
  }

  setValue(value: string): void {
    this.value = value;
  }

  getValuePromise() {
    return Promise.resolve('Value promise');
  }

  getValueObservable(): Observable<string> {
    return of('Value observable');
  }
}
