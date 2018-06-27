import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of as observableOf } from 'rxjs/Observable/of';
import { take, switchMap } from 'rxjs/operators';
import { Store } from '@ngxs/store';

import { SetCurrentPatient } from '../patients.actions';

@Injectable()
export class PatientResolver implements Resolve<boolean> {

  constructor(private readonly store: Store) {
  }

  resolve(route: ActivatedRouteSnapshot,
          routerState: RouterStateSnapshot): Observable<boolean> {

    return this.store.dispatch(new SetCurrentPatient(+route.params.patientId))
      .pipe(
        take(1),
        switchMap(_ => observableOf(true))
      );

  }

}
