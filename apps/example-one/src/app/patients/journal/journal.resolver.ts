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
