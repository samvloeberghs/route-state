import { Injectable } from '@angular/core';
import { of as observableOf } from 'rxjs/Observable/of';
import { Observable } from 'rxjs';

import { User } from './user/user.model';
import { AuthStateModel } from './auth.state';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login(): Observable<AuthStateModel> {
    return observableOf(<AuthStateModel>{
      token: '1234',
      user: <User>{
        id: 1,
        name: 'Antoine',
        role: 'PO'
      }
    });
  }

  logout(): Observable<AuthStateModel> {
    return observableOf(<AuthStateModel>{
      token: undefined,
      user: undefined
    });
  }

}
