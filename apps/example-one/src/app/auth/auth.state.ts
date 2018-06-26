import { Action, State, StateContext } from '@ngxs/store';

import { User } from './user/user.model';
import { SetUserAction } from './auth.actions';

export interface AuthStateModel {
  currentUser: User
}

@State<AuthStateModel>({
  name: 'AuthState',
  defaults: {
    currentUser: undefined
  }
})
export class AuthState {

  constructor() {

  }

  @Action(SetUserAction)
  setCurrentPatientId({ getState, patchState, dispatch }: StateContext<AuthStateModel>, { payload }: SetUserAction) {
    patchState({ currentUser: payload });
  }

}
