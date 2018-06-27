export class Login {
  static readonly type = '[AuthState] LOGIN';
}

export class Logout {
  static readonly type = '[AuthState] LOGOUT';

  constructor() {
  }
}

