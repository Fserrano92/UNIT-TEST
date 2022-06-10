export class ValueFakeService {
  constructor() { }

  getValue(): string {
    return 'my name fake service';
  }

  setValue(value: string): void {
  }

  getValuePromise() {
    return Promise.resolve('Value promise');
  }
}
