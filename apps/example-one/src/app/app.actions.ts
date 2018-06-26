import { MODULE } from './app.component';

export class SetCurrentSelectedModuleAction {
  static readonly type = '[AppState] SET_CURRENT_MODULE';

  constructor(public payload: MODULE) {
  }
}

