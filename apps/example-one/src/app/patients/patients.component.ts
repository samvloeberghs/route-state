import { Component, OnInit } from '@angular/core';;
import { Patient } from './patient/patient.model';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';

@Component({
  selector: 'e1-patients',
  templateUrl: './patients.component.html',
  styles: []
})
export class PatientsComponent implements OnInit {

  @Select(state => state.PatientsState.currentPatientId) currentPatientId$: Observable<number>;
  @Select(state => state.PatientsState.patients) patients$: Observable<Patient[]>;

  constructor() {
  }

  ngOnInit() {

  }

  trackByPatient(index, patient: Patient) {
    return patient.id;
  }

}
