import { Action, State, StateContext } from '@ngxs/store';

import { MODULE } from './app.component';
import { SetCurrentSelectedModuleAction } from './app.actions';

export interface AppStateModel {
  selectedModule: MODULE;
}

@State<AppStateModel>({
  name: 'AppState',
  defaults: {
    selectedModule: MODULE.A
  }
})
export class AppState {

  constructor() {

  }

  @Action(SetCurrentSelectedModuleAction)
  setCurrentItemId({ getState, patchState, dispatch }: StateContext<AppStateModel>, { payload }: SetCurrentSelectedModuleAction) {
    patchState({ selectedModule: payload });
  }

}
