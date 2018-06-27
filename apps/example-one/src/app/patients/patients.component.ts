import { Component, OnInit } from '@angular/core';;
import { Patient } from './patient/patient.model';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { PatientsState } from './patients.state';

@Component({
  selector: 'e1-patients',
  templateUrl: './patients.component.html',
  styles: []
})
export class PatientsComponent implements OnInit {

  @Select(PatientsState.currentPatient) currentPatient$: Observable<Patient>;
  @Select(PatientsState.patients) patients$: Observable<Patient[]>;

  constructor() {
  }

  ngOnInit() {

  }

  trackByPatient(index, patient: Patient) {
    return patient.id;
  }

}
