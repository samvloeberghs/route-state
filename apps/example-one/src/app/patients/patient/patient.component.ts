import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';

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

  constructor(private readonly router: Router,
              private readonly store: Store) {
  }

  ngOnInit() {
    if (this.patient && this.patient.state) {
      switch (this.patient.state.selectedPart) {
        case PATIENTPART.JOURNAL:
          this.router.navigate(['patients', this.patient.id, 'journal']);
          break;
        default:
          this.router.navigate(['patients', this.patient.id, 'fiche']);
          break;
      }
    }
  }

  // TODO: set in state machine
  selectPart($event, part: PATIENTPART) {
    this.store.dispatch(new SetPatientPart({ patient: this.patient, part }));
  }

}
