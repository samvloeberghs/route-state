import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { take, switchMap } from 'rxjs/operators';
import { PATIENTPART } from '../patients.state';
import { Patient } from '../patient/patient.model';

@Injectable()
export class CanActivateFicheGuard implements CanActivate {

  constructor(private readonly store: Store,
              private readonly router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
          routerState: RouterStateSnapshot): Observable<boolean> {

    return Observable.create(observer => {
      this.store.select(state => state.PatientsState.currentPatient)
        .pipe(
          take(1),
        ).subscribe((currentPatient: Patient) => {
        if (currentPatient.state) {
          switch (currentPatient.state.selectedPart) {
            // ADD MORE HERE
            case PATIENTPART.JOURNAL:
              observer.error(false);
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
