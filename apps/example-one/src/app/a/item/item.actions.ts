import { ItemStateModel } from './item.state';

export class SetCurrentIdAction {
  static readonly type = '[ItemsState] SET_CURRENT_ID';

  constructor(public payload: number) {
  }
}

export class SetItemStateAction {
  static readonly type = '[ItemsState] SET_ITEM_STATE';

  constructor(public payload: ItemStateModel) {
  }
}

export class SetItemOneFormStateAction {
  static readonly type = '[ItemsState] SET_ITEM_ONE_FORM_STATE';

  constructor(public payload: { id: number, item: ItemStateModel }) {
  }
}

export class SetItemUrlStateAction {
  static readonly type = '[ItemsState] SET_ITEM_URL_STATE';

  constructor(public payload: ItemStateModel) {
  }
}

/*
export class SetItemAction {
  static readonly type = '[ItemsState] SET_ITEM';

  constructor(public payload: { id: number, data: Item }) {
  }
}
*/
