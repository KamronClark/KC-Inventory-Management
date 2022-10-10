import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Item } from './item';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const items = [
      { id: 1, qty: 12, name: '7160-0203-g' },
      { id: 2, qty: 13, name: '11987' },
      { id: 3, qty: 14, name: '7120-4503-01' },
      { id: 4, qty: 15, name: '8100-3045-TA' },
      { id: 5, qty: 16, name: 'ACME 0.25x SCREW BOLT' },
      { id: 6, qty: 17, name: 'FOO BAR 1.75 x 3.46 FLAT PANEL' },
      { id: 7, qty: 18, name: 'TACGE 4100 LINT BAG' },
      { id: 8, qty: 19, name: 'UNITED METAL 2016 5400 STEEL POLE' },
      { id: 9, qty: 20, name: 'LASER APPLICATIONS 234 x 3450 NET BREAKER' }
    ];
    return {items};
  }

  // Overrides the genId method to ensure that a item always has an id.
  // If the items array is empty,
  // the method below returns the initial number (11).
  // if the items array is not empty, the method below returns the highest
  // item id + 1.
  genId(items: Item[]): number {
    return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 11;
  }
}