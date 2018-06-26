import { Action, State, StateContext } from '@ngxs/store';

import { SetCurrentSelectedModuleAction } from './app.actions';

export enum MODULE {
  PATIENTS = 'e1-patients',
  CALENDAR = 'e1-calendar'
}

export interface AppStateModel {
  selectedModule: MODULE;
}

@State<AppStateModel>({
  name: 'AppState',
  defaults: {
    selectedModule: MODULE.PATIENTS,
  }
})
export class AppState {

  constructor() {

  }

  @Action(SetCurrentSelectedModuleAction)
  setCurrentSelectedModule({ getState, patchState, dispatch }: StateContext<AppStateModel>, { payload }: SetCurrentSelectedModuleAction) {
    patchState({ selectedModule: payload });
  }

}
