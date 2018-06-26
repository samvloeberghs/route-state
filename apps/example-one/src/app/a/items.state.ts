import { Action, State, StateContext } from '@ngxs/store';

import {
  SetCurrentItemIdAction, SetItemsAction
} from './items.actions';
import { Item } from './item/item.model';

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

  constructor() {

  }

  @Action(SetCurrentItemIdAction)
  setCurrentItemId({ getState, patchState, dispatch }: StateContext<ItemsStateModel>, { payload }: SetCurrentItemIdAction) {
    patchState({ currentItemId: payload });
  }

  @Action(SetItemsAction)
  setItems({ getState, patchState, dispatch }: StateContext<ItemsStateModel>, { payload }: SetItemsAction) {
    patchState({ items: payload });
  }

}
