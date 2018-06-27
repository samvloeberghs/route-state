import { Injectable } from '@angular/core';
import { NgForage } from 'ngforage';
import { Store } from '@ngxs/store';

import { SetCurrentPatient } from './patients.actions';
import { Patient } from './patient/patient.model';

export enum PATIENTS_PERSISTENCE {
  CURRENT_PATIENT = 'CURRENT_PATIENT'
}

@Injectable({
  providedIn: 'root'
})
export class PatientsPersistenceService {

  constructor(private readonly ngf: NgForage,
              private store: Store) {
    this.unserialize();
  }

  serializeState(currentPatient: Patient) {
    if (!!currentPatient) {
      this.ngf.setItem(PATIENTS_PERSISTENCE.CURRENT_PATIENT, currentPatient);
    } else {
      this.ngf.removeItem(PATIENTS_PERSISTENCE.CURRENT_PATIENT);
    }
  }

  private unserialize() {
    this.ngf.getItem<Patient>(PATIENTS_PERSISTENCE.CURRENT_PATIENT).then((currentPatient) => {
      if (!!currentPatient) {
        this.store.dispatch(new SetCurrentPatient(currentPatient.id));
      }
    });
  }

}
