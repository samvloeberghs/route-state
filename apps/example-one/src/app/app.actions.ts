import { MODULE } from './app.state';

export class SetCurrentSelectedModuleAction {
  static readonly type = '[AppState] SET_CURRENT_MODULE';

  constructor(public payload: MODULE) {
  }
}

