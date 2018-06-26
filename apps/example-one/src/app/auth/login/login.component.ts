import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Select } from '@ngxs/store';

import { AuthService } from '../auth.service';
import { User } from '../user/user.model';

@Component({
  selector: 'e1-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Select(state => state.AuthState.currentUser) currentUser$: Observable<User[]>;

  constructor(private readonly authService: AuthService) {
  }

  ngOnInit() {
  }

  login($event?: Event) {
    if ($event && $event.preventDefault) {
      $event.preventDefault();
    }
    this.authService.login();
  }

  logout($event?: Event) {
    if ($event && $event.preventDefault) {
      $event.preventDefault();
    }
    this.authService.logout();
  }

}
