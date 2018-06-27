import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

import { Patient } from './patient.model';
import { PATIENTPART } from '../patients.state';
import { SetPatientPart } from '../patients.actions';

@Component({
  selector: 'e1-patient',
  templateUrl: './patient.component.html',
  styles: []
})
export class PatientComponent implements OnInit {

  @Input() patient: Patient;
  PATIENTPART = PATIENTPART;

  constructor(private readonly store: Store) {
  }

  ngOnInit() {

  }

  selectPart($event, part: PATIENTPART) {
    this.store.dispatch(new SetPatientPart({ patient: this.patient, part }));
  }

}
