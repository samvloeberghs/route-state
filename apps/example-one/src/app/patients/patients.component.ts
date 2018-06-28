import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';

import { Patient } from './patient/patient.model';
import { PatientsState } from './patients.state';

@Component({
  selector: 'e1-patients',
  templateUrl: './patients.component.html',
  styles: []
})
export class PatientsComponent {

  @Select(PatientsState.currentPatient) currentPatient$: Observable<Patient>;
  @Select(PatientsState.patients) patients$: Observable<Patient[]>;

  /*
  Tracking by patient id:
  only update the item in the interation if this specific kvp changes
   */
  trackByPatient(index, patient: Patient) {
    return patient.id;
  }

}
