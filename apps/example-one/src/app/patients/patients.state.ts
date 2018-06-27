import { Action, State, StateContext } from '@ngxs/store';

import { Patient } from './patient/patient.model';
import { PatientsPersistenceService } from './patients-persistence.service';
import { SetCurrentPatientId, SetPatients } from './patients.actions';

export interface PatientsStateModel {
  currentPatientId: number;
  patients: Patient[];
}

export interface PatientState {
  checked: boolean;
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

}
