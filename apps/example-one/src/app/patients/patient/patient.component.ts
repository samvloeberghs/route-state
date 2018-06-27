import { Component, Input, OnInit } from '@angular/core';
import { Patient } from './patient.model';

enum PATIENTPART {
  FICHE = 'e1-fiche',
  JOURNAL = 'e1-journal'
}

@Component({
  selector: 'e1-patient',
  templateUrl: './patient.component.html',
  styles: []
})
export class PatientComponent implements OnInit {

  @Input() patient: Patient;

  PATIENTPART = PATIENTPART;
  selectedPatientPart = PATIENTPART.FICHE;


  constructor() {
  }

  ngOnInit() {

  }

  // TODO: set in state machine
  selectPart($event, part: PATIENTPART) {
    this.selectedPatientPart = part;
  }

}
