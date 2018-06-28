import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { SetCurrentPatient } from '../patients.actions';
import { SetCurrentSelectedModule } from '../../app.actions';
import { MODULE } from '../../app.state';
import { Patient } from '../patient/patient.model';
import { PatientsState } from '../patients.state';

@Component({
  selector: 'e1-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss']
})
export class PatientsListComponent {

  @Select(PatientsState.patients) patients$: Observable<Patient[]>;

  constructor(private readonly store: Store) {
  }

  selectPatient($event, patient: Patient) {
    this.store.dispatch(new SetCurrentSelectedModule(MODULE.PATIENTS));
    this.store.dispatch(new SetCurrentPatient(patient));
  }

  /*
  Same track by functionality as in patients.component
   */
  trackByPatient(index: number, patient: Patient) {
    return patient.id;
  }
}
