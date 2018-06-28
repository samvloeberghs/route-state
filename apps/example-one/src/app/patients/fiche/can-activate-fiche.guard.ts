import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { take } from 'rxjs/operators';

import { PATIENTPART } from '../patients.state';
import { Patient } from '../patient/patient.model';

@Injectable()
export class CanActivateFicheGuard implements CanActivate {

  constructor(private readonly store: Store,
              private readonly router: Router) {
  }

  /*
  Because fiche is our default route, we check here if it is the correct one
  to route to. It could be that the previously selected subroute/part of the
  current patient was set to another subroute/part. If so navigate to it.
  Observable logic could probably be simplified
   */
  canActivate(route: ActivatedRouteSnapshot,
              routerState: RouterStateSnapshot): Observable<boolean> {

    return Observable.create(observer => {
      this.store.select(state => state.PatientsState.currentPatient)
        .pipe(
          take(1)
        ).subscribe((currentPatient: Patient) => {
        if (currentPatient && currentPatient.state) {
          switch (currentPatient.state.selectedPart) {
            // ADD MORE HERE
            case PATIENTPART.JOURNAL:
              observer.next(false);
              observer.complete();
              this.router.navigate(['patients', currentPatient.id, 'journal']);
              break;
            default:
              observer.next(true);
              observer.complete();
              break;
          }
        } else {
          observer.next(true);
          observer.complete();
        }
      });
    });

  }

}
