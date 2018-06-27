import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { SetCurrentPatientId } from '../patients.actions';
import { take } from 'rxjs/operators';

@Injectable()
export class PatientResolver implements Resolve<boolean> {

  constructor(private store: Store) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.store.dispatch(new SetCurrentPatientId(+route.params.patientId)).subscribe(_ => {
        observer.next(true);
      }, () => {
        observer.error(false);
      });
    }).pipe(
      take(1)
    );
  }

}
