import { User } from './user/user.model';

export class SetUserAction {
  static readonly type = '[AuthState] SET_USER';

  constructor(public payload?: User) {
  }
}
