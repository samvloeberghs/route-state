import { Component, Input, OnInit } from '@angular/core';
import { Patient } from './patient.model';

enum PATIENTPART {
  PARTONE = 'e1-one',
  PARTTWO = 'e1-two'
}

@Component({
  selector: 'e1-patient',
  templateUrl: './patient.component.html',
  styles: []
})
export class PatientComponent implements OnInit {

  @Input() patient: Patient;

  PATIENTPART = PATIENTPART;
  selectedPatientPart = PATIENTPART.PARTONE;


  constructor() {
  }

  ngOnInit() {

  }

  // TODO: set in state machine
  selectPart($event, part: PATIENTPART) {
    this.selectedPatientPart = part;
  }

}
