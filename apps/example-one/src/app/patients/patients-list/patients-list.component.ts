import { Component, OnInit } from '@angular/core';
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
export class PatientsListComponent implements OnInit {

  @Select(PatientsState.patients) patients$: Observable<Patient[]>;

  constructor(private store: Store) {
  }

  ngOnInit() {
  }

  selectPatient($event, patient: Patient) {
    this.store.dispatch(new SetCurrentSelectedModule(MODULE.PATIENTS));
    this.store.dispatch(new SetCurrentPatient(patient.id));
  }

  trackByPatient(index: number, patient: Patient) {
    return patient.id;
  }
}
