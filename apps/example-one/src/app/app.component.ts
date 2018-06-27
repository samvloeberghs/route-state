import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, take } from 'rxjs/operators';
import { Router } from '@angular/router';

import { SetCurrentSelectedModule } from './app.actions';
import { AppState, MODULE } from './app.state';
import { PATIENTPART, PatientsStateModel } from './patients/patients.state';

@Component({
  selector: 'e1-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  MODULE = MODULE;
  @Select(AppState.selectedModule) selectedModule$: Observable<MODULE>;

  constructor(private readonly router: Router,
              private readonly store: Store) {
  }

  selectModule($event, part: MODULE) {
    //this.
    this.store.select(state => state.PatientsState)
      .pipe(
        take(1)
      )
      .subscribe((patientsState: PatientsStateModel) => {
        this.store.dispatch(new SetCurrentSelectedModule(part));

        if (!!patientsState.currentPatient && part === MODULE.PATIENTS) {
          if(patientsState.currentPatient.state) {
            switch (patientsState.currentPatient.state.selectedPart) {
              // ADD MORE HERE
              case PATIENTPART.JOURNAL:
                this.router.navigate(['patients', patientsState.currentPatient.id, 'journal']);
                break;
              default:
                this.router.navigate(['patients', patientsState.currentPatient.id]);
                break;
            }
          } else {
            this.router.navigate(['patients', patientsState.currentPatient.id]);
          }
        }
      });
  }

}
