import { Action, State, StateContext } from '@ngxs/store';

import { SetCurrentSelectedModule } from './app.actions';

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

  @Action(SetCurrentSelectedModule)
  setCurrentSelectedModule({ getState, patchState, dispatch }: StateContext<AppStateModel>, { payload }: SetCurrentSelectedModule) {
    patchState({ selectedModule: payload });
  }

}
