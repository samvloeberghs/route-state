import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgForage } from 'ngforage';
import { ItemsState } from './items.state';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private currentItemsState = new BehaviorSubject<ItemsState>(undefined);
  currentItemId: number;

  private itemsState = {};
  private ITEMS_STATE = 'ITEMS_STATE';
  private CURRENT_ITEM_ID = 'CURRENT_ITEMS_ID';

  constructor(private readonly ngf: NgForage,
              private route: ActivatedRoute,
              private router: Router) {

    this.unserializeState();
    this.subscribe();

  }

  getItemState(id: number) {
    const state = this.itemsState[id];
    this.currentItemsState.next(state);
    this.currentItemId = id;
    this.serializeState();
    return state;
  }

  setItemState(id: number, newItemState: ItemsState) {
    this.itemsState[id] = {
      ...this.itemsState[id],
      ...newItemState
    };
    this.currentItemsState.next(this.itemsState[id]);
    this.serializeState();
    return this.itemsState;
  }

  /*
  removeItemSate(id: number) {
    delete this.itemsState[id];
    this.serializeState();
    return this.itemsState;
  }
  */

  private unserializeState() {
    this.ngf.getItem<string>(this.ITEMS_STATE).then(itemsState => {
      if (itemsState) {
        this.itemsState = JSON.parse(itemsState);
      }
    });
    this.ngf.getItem<number>(this.CURRENT_ITEM_ID).then((currentItemId) => {
      if (currentItemId) {
        this.getItemState(currentItemId);
      }
    });
  }

  private serializeState() {
    this.ngf.setItem(this.ITEMS_STATE, JSON.stringify(this.itemsState));
    if (this.currentItemId) {
      this.ngf.setItem(this.CURRENT_ITEM_ID, this.currentItemId);
    }
  }

  private subscribe() {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {

      if (event.urlAfterRedirects.indexOf('/a/') > -1) {
        const itemState = this.getItemState(this.currentItemId);

        // set the new state for this item
        const newItemState = {
          ...itemState,
          url: event.urlAfterRedirects
        };
        this.currentItemsState.next(newItemState);
        this.setItemState(this.currentItemId, newItemState);

      }
    });

  }


}
