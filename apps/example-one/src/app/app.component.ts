import { Component } from '@angular/core';
import { SetCurrentPatientIdAction } from './patients/patients.actions';
import { Select, Store } from '@ngxs/store';
import { SetCurrentSelectedModuleAction } from './app.actions';
import { Observable } from 'rxjs';
import { distinctUntilChanged, take } from 'rxjs/operators';
import { Router } from '@angular/router';

export enum MODULE {
  PATIENTS = 'e1-patients',
  CALENDAR = 'e1-calendar'
}

@Component({
  selector: 'e1-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  MODULE = MODULE;
  @Select(state => state.AppState.selectedModule) selectedModule$: Observable<MODULE>;

  constructor(private router: Router,
              private readonly store: Store) {
  }

  selectModule($event, part: MODULE) {
    this.store.select(state => state.PatientsState.currentPatientId)
      .pipe(
        distinctUntilChanged(),
        take(1)
      )
      .subscribe(currentPatientId => {
        this.store.dispatch(new SetCurrentSelectedModuleAction(part));
        if (!!currentPatientId && part === MODULE.PATIENTS) {
          this.router.navigate(['patients', currentPatientId]);
          this.store.dispatch(new SetCurrentPatientIdAction(currentPatientId));
        }
      });
  }

}
