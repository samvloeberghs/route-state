import { Injectable } from '@angular/core';
import { Item } from './item/item.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { of as observableOf } from 'rxjs';
import { Store } from '@ngxs/store';
import { SetCurrentIdAction, SetItemStateAction } from './item/item.actions';

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

  constructor(private store: Store) {
  }

  getItem(id: number): Observable<Item> {
    const selectedItem = this.itemsList.find((item) => {
      return item.id === id;
    });
    const actionPayload = {
      item: selectedItem
    };

    this.store.dispatch(new SetItemStateAction(actionPayload));
    return observableOf(selectedItem);
  }

  getItems(): Observable<Item[]> {
    this.items.next(this.itemsList);
    return observableOf(this.itemsList);
  }

}
