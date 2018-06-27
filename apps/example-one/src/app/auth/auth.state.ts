import { Action, State, StateContext } from '@ngxs/store';

import { User } from './user/user.model';
import { LoginAction, LogoutAction } from './auth.actions';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

export interface AuthStateModel {
  token: string;
  user: User;
}

@State<AuthStateModel>({
  name: 'AuthState',
  defaults: {
    token: undefined,
    user: undefined
  }
})
export class AuthState {

  constructor(private readonly authService: AuthService) {

  }

  @Action(LoginAction)
  login({ getState, patchState, dispatch }: StateContext<AuthStateModel>, {  }: LoginAction) {
    return this.authService.login()
      .pipe(tap((authState: AuthStateModel) => {
        patchState(authState);
      }));
  }

  @Action(LogoutAction)
  logout({ getState, patchState, dispatch }: StateContext<AuthStateModel>, {  }: LogoutAction) {
    return this.authService.logout()
      .pipe(tap((authState: AuthStateModel) => {
        patchState(authState);
      }));
  }

}
