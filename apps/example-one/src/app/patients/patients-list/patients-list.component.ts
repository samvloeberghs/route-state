import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { SetCurrentPatientIdAction } from '../patients.actions';
import { SetCurrentSelectedModuleAction } from '../../app.actions';
import { MODULE } from '../../app.component';
import { Patient } from '../patient/patient.model';

@Component({
  selector: 'e1-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss']
})
export class PatientsListComponent implements OnInit {

  @Select(state => state.PatientsState.patients) patients$: Observable<Patient[]>;

  constructor(private store: Store) {
  }

  ngOnInit() {
  }

  selectPatient($event, id: number) {
    this.store.dispatch(new SetCurrentSelectedModuleAction(MODULE.PATIENTS));
    this.store.dispatch(new SetCurrentPatientIdAction(id));
  }

}
