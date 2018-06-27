import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetUserAction } from './auth.actions';
import { User } from './user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private store: Store) {
  }

  login() {
    this.store.dispatch(new SetUserAction(<User>{
      id: 1,
      name: 'Antoine',
      role: 'PO'
    }));
  }

  logout() {
    this.store.dispatch(new SetUserAction(undefined));
  }

}
