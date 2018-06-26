import { Injectable } from '@angular/core';
import { StateService } from './state.service';
import { Store } from '@ngxs/store';
import { SetItemsAction } from './items.actions';
import { Item } from './item/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private itemsList = [
    <Item>{
      id: 1,
      name: 'Sam',
      role: 'developer'
    },
    <Item>{
      id: 2,
      name: 'Jurgen',
      role: 'architect'
    }
  ];

  constructor(private stateService: StateService,
              private store: Store) {
    this.getItems();
  }

  private getItems() {
    this.store.dispatch(new SetItemsAction(this.itemsList));
  }

}
