import { Injectable } from '@angular/core';
import { Item } from './item/item.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { of as observableOf } from 'rxjs';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private items = new BehaviorSubject<Item[]>(undefined);
  items$ = this.items.asObservable();

  private itemsList = [
    {
      id: 1,
      name: 'Sam',
      role: 'developer'
    },
    {
      id: 2,
      name: 'Jurgen',
      role: 'architect'
    }
  ];

  constructor(private stateService: StateService) {
  }

  getItem(id: number): Observable<Item> {
    const selectedItem = this.itemsList.find((item) => {
      return item.id === id;
    });
    this.stateService.currentItemId = id;
    this.stateService.getItemState(id);
    return observableOf(selectedItem);
  }

  getItems(): Observable<Item[]> {
    this.items.next(this.itemsList);
    return observableOf(this.itemsList);
  }

}
