import { MODULE } from './app.state';

export class SetCurrentSelectedModule {
  static readonly type = '[App] Set Current Selected Module';

  constructor(public payload: MODULE) {
  }
}

