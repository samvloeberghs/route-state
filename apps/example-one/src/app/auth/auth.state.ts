import { Action, State, StateContext } from '@ngxs/store';

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

  constructor(private authService: AuthService) {

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
