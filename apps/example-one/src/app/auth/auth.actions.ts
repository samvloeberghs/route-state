import { User } from './user/user.model';

export class LoginAction {
  static readonly type = '[AuthState] LOGIN';
}

export class LogoutAction {
  static readonly type = '[AuthState] LOGOUT';

  constructor() {
  }
}

