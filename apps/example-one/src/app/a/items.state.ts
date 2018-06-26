import { Action, State, StateContext, Store } from '@ngxs/store';

import {
  SetCurrentItemIdAction, SetItemsAction
} from './items.actions';
import { Item } from './item/item.model';
import { NgForage } from 'ngforage';

export interface ItemsStateModel {
  currentItemId: number;
  items: Item[];
}

export interface ItemState {
  checked: boolean;
}

@State<ItemsStateModel>({
  name: 'ItemsState',
  defaults: {
    currentItemId: 0,
    items: []
  }
})
export class ItemsState {

  private CURRENT_ITEM_ID = 'CURRENT_ITEMS_ID';

  constructor(private readonly ngf: NgForage,
              private readonly store: Store) {
    console.log('ItemsState init');
    // TODO: check if we can do this outside of the itemsstate;
    // this.unserialize();
  }

  @Action(SetCurrentItemIdAction)
  setCurrentItemId({ getState, patchState, dispatch }: StateContext<ItemsStateModel>, { payload }: SetCurrentItemIdAction) {
    patchState({ currentItemId: payload });
    this.ngf.setItem(this.CURRENT_ITEM_ID, payload);
  }

  @Action(SetItemsAction)
  setItems({ getState, patchState, dispatch }: StateContext<ItemsStateModel>, { payload }: SetItemsAction) {
    patchState({ items: payload });
  }

  private unserialize() {
    this.ngf.getItem<number>(this.CURRENT_ITEM_ID).then((currentItemId) => {
      console.log('unserialize');
      if (!!currentItemId) {
        this.store.dispatch(new SetCurrentItemIdAction(currentItemId));
      }
    });
  }

}
