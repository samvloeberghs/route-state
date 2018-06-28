import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { of as observableOf } from 'rxjs/Observable/of';
import { take, switchMap } from 'rxjs/operators';

import { SetPatientPart } from '../patients.actions';
import { PATIENTPART } from '../patients.state';

@Injectable()
export class JournalResolver implements Resolve<boolean> {

  constructor(private readonly store: Store) {
  }

  resolve(route: ActivatedRouteSnapshot,
          routerState: RouterStateSnapshot): Observable<boolean> {

    /*
    Here we make sure that the current select part for the current patient is the correct one.
    We don't do this at 'fiche'  because that is our default route.
    This has to be done for every not default part/subroute of patient
    Could probably be made more generic for all non default routes
     */
    return this.store.select(state => state.PatientsState.currentPatient)
      .pipe(
        take(1),
        switchMap(currentPatient => this.store.dispatch(new SetPatientPart({
          patient: currentPatient,
          part: PATIENTPART.JOURNAL
        }))),
        switchMap(_ => observableOf(true)),
        take(1)
      );

  }

}
