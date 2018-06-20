import { Action, State, StateContext, Store } from '@ngxs/store';
import { ItemStateModel } from './item/item.state';
import {
  SetCurrentIdAction,
  SetItemOneFormStateAction,
  SetItemStateAction,
  SetItemUrlStateAction
} from './item/item.actions';
import { filter } from 'rxjs/operators';
import { Item } from './item/item.model';

export interface ItemsStateModel {
  currentId: number;
  items: ItemStateModel[];
}

@State<ItemsStateModel>({
  name: 'a',
  defaults: {
    currentId: 0,
    items: []
  }
})
export class ItemsState {

  constructor(private store: Store) {
    this.store.select(state => state.router.state).pipe(
      filter(_ => !!_)
    ).subscribe(_ => {
      console.log(_);
    });
  }

  @Action(SetItemStateAction)
  setItemState({ getState, patchState, dispatch }: StateContext<ItemsStateModel>, { payload }: SetItemStateAction) {
    const currentState = getState();
    if (payload) {
      const newState = this.patchItemState(currentState, payload);
      this.store.dispatch(new SetCurrentIdAction(payload.item.id));
      patchState(newState);
    }
  }

  @Action(SetItemOneFormStateAction)
  setItemOneFormState({ getState, patchState, dispatch }: StateContext<ItemsStateModel>, { payload }: SetItemOneFormStateAction) {
    const currentState = getState();
    if (payload) {
      const newState = this.patchItemExtraState(currentState, payload);
      patchState(newState);
    }
  }

  @Action(SetItemUrlStateAction)
  setItemUrlState({ getState, patchState, dispatch }: StateContext<ItemsStateModel>, { payload }: SetItemUrlStateAction) {
    const currentState = getState();
    if (payload && currentState && currentState.currentId) {
      const newState = this.patchItemExtraState(currentState, { id: currentState.currentId, item: payload });
      patchState(newState);
    }
  }

  @Action(SetCurrentIdAction)
  setCurrentId({ getState, patchState, dispatch }: StateContext<ItemsStateModel>, { payload }: SetCurrentIdAction) {
    patchState({ currentId: payload });
  }

  private patchItemState(currentState, payload) {

    let newState = currentState;

    if (currentState && currentState.items) {
      const itemIndex = currentState.items.findIndex((item: Item) => {
        return item.id === payload.item.id;
      });

      let newItems = [];

      if (itemIndex === -1) {
        newItems = [...currentState.items, payload.item];
      } else {
        const data = payload.item;
        const item = { ...currentState.items[itemIndex], ...data };
        currentState.items.splice(itemIndex, 1);
        newItems = [...currentState.items, item];
      }

      newState = { items: newItems };

    } else {
      newState = { items: [payload.item] };
    }

    return newState;

  }

  private patchItemExtraState(currentState, payload) {

    let newState = currentState;

    if (currentState && currentState.items) {

      const itemIndex = currentState.items.findIndex((item: Item) => {
        return item.id === payload.id;
      });

      if (itemIndex > -1) {
        const data = payload.item;
        const item = { ...currentState.items[itemIndex], ...data };
        currentState.items.splice(itemIndex, 1);
        newState = { items: [...currentState.items, item] };
      }

    }

    return newState;
  }

}
