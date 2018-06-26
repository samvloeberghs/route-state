import { Item } from './item/item.model';

export class SetCurrentItemIdAction {
  static readonly type = '[ItemsState] SET_CURRENT_ITEM_ID';

  constructor(public payload: number) {
  }
}

export class SetItemsAction {
  static readonly type = '[ItemsState] SET_ITEMS';

  constructor(public payload: Item[]) {
  }
}
