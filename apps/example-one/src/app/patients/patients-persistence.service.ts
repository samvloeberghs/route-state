import { Injectable } from '@angular/core';
import { NgForage } from 'ngforage';
import { Store } from '@ngxs/store';

import { SetCurrentPatientId } from './patients.actions';

export enum PATIENTS_PERSISTENCE {
  CURRENT_PATIENT_ID = 'CURRENT_PATIENT_ID'
}

@Injectable({
  providedIn: 'root'
})
export class PatientsPersistenceService {

  constructor(private readonly ngf: NgForage,
              private store: Store) {
    this.unserialize();
  }

  serializeState(currentPatientId: number) {
    if (!!currentPatientId) {
      this.ngf.setItem(PATIENTS_PERSISTENCE.CURRENT_PATIENT_ID, currentPatientId);
    } else {
      this.ngf.removeItem(PATIENTS_PERSISTENCE.CURRENT_PATIENT_ID);
    }
  }

  private unserialize() {
    this.ngf.getItem<number>(PATIENTS_PERSISTENCE.CURRENT_PATIENT_ID).then((currentPatientId) => {
      if (!!currentPatientId) {
        this.store.dispatch(new SetCurrentPatientId(currentPatientId));
      }
    });
  }

}
