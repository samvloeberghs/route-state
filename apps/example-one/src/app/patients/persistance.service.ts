import { Injectable } from '@angular/core';
import { NgForage } from 'ngforage';
import { Store } from '@ngxs/store';

import { SetCurrentPatientIdAction } from './patients.actions';

export enum PERSISTANCE {
  CURRENT_PATIENT_ID = 'CURRENT_PATIENT_ID'
}

@Injectable({
  providedIn: 'root'
})
export class PersistanceService {

  constructor(private readonly ngf: NgForage,
              private store: Store) {
    this.unserialize();
  }

  serializeState(currentPatientId: number) {
    if (!!currentPatientId) {
      this.ngf.setItem(PERSISTANCE.CURRENT_PATIENT_ID, currentPatientId);
    } else {
      this.ngf.removeItem(PERSISTANCE.CURRENT_PATIENT_ID);
    }
  }

  private unserialize() {
    this.ngf.getItem<number>(PERSISTANCE.CURRENT_PATIENT_ID).then((currentPatientId) => {
      if (!!currentPatientId) {
        this.store.dispatch(new SetCurrentPatientIdAction(currentPatientId));
      }
    });
  }

}
