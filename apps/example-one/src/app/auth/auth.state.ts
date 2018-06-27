import { Action, State, StateContext, Selector } from '@ngxs/store';

import { User } from './user/user.model';
import { Login, Logout } from './auth.actions';
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

  @Selector()
  static token(state: AuthStateModel) {
    return state.token;
  }

  @Selector()
  static user(state: AuthStateModel) {
    return state.user;
  }

  constructor(private readonly authService: AuthService) {

  }

  @Action(Login)
  login({ patchState }: StateContext<AuthStateModel>, {}: Login) {
    return this.authService.login()
      .pipe(tap((authState: AuthStateModel) => {
        patchState(authState);
      }));
  }

  @Action(Logout)
  logout({ patchState }: StateContext<AuthStateModel>, {}: Logout) {
    return this.authService.logout()
      .pipe(tap((authState: AuthStateModel) => {
        patchState(authState);
      }));
  }

}
