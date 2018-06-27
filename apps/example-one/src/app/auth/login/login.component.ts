import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Select, Store } from '@ngxs/store';

import { User } from '../user/user.model';
import { Login, Logout } from '../auth.actions';

@Component({
  selector: 'e1-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Select(state => state.AuthState.user) user$: Observable<User[]>;

  constructor(private readonly store: Store) {
  }

  ngOnInit() {
  }

  login($event?: Event) {
    if ($event && $event.preventDefault) {
      $event.preventDefault();
    }
    this.store.dispatch(new Login());

  }

  logout($event?: Event) {
    if ($event && $event.preventDefault) {
      $event.preventDefault();
    }
    this.store.dispatch(new Logout());
  }

}
