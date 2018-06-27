import { Action, State, StateContext } from '@ngxs/store';

import { Patient } from './patient/patient.model';
import { PatientsPersistenceService } from './patients-persistence.service';
import { SetCurrentPatientId, SetPatientPart, SetPatients } from './patients.actions';

export interface PatientsStateModel {
  currentPatientId: number;
  patients: Patient[];
}

export enum PATIENTPART {
  FICHE = 'e1-fiche',
  JOURNAL = 'e1-journal'
}

export interface PatientState {
  selectedPart: PATIENTPART;
}

@State<PatientsStateModel>({
  name: 'PatientsState',
  defaults: {
    currentPatientId: 0,
    patients: []
  }
})
export class PatientsState {

  constructor(private readonly persistenceService: PatientsPersistenceService) {
    console.log('PatientsState init');
  }

  @Action(SetCurrentPatientId)
  setCurrentPatientId({ getState, patchState, dispatch }: StateContext<PatientsStateModel>, { payload }: SetCurrentPatientId) {
    patchState({ currentPatientId: payload });
    this.persistenceService.serializeState(payload);
  }

  @Action(SetPatients)
  setPatients({ getState, patchState, dispatch }: StateContext<PatientsStateModel>, { payload }: SetPatients) {
    patchState({ patients: payload });
  }

  @Action(SetPatientPart)
  setPatientPart({ getState, patchState, dispatch }: StateContext<PatientsStateModel>, { payload }: SetPatientPart) {

    const currentPatients = getState().patients;
    const patientIndex = currentPatients.findIndex(patient => {
      return payload.patient.id === patient.id;
    });

    if (patientIndex > -1) {

      const newPatients = [...currentPatients];
      newPatients[patientIndex] = {
        ...currentPatients[patientIndex],
        state: {
          selectedPart: payload.part
        }
      };

      patchState({ patients: newPatients });

    }

  }

}
