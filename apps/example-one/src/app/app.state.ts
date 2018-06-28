import { Action, State, StateContext, Selector } from '@ngxs/store';

import { SetCurrentSelectedModule } from './app.actions';

export enum MODULE {
  PATIENTS = 'patients',
  CALENDAR = 'calendar'
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

  @Selector()
  static selectedModule(state: AppStateModel) {
    return state.selectedModule;
  }

  @Action(SetCurrentSelectedModule)
  setCurrentSelectedModule({ patchState }: StateContext<AppStateModel>, { payload }: SetCurrentSelectedModule) {
    patchState({ selectedModule: payload });
  }

}
