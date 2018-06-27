import { Action, State, StateContext } from '@ngxs/store';

import { Patient } from './patient/patient.model';
import { PatientsPersistenceService } from './patients-persistence.service';
import { SetCurrentPatientIdAction, SetPatientsAction } from './patients.actions';

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

  @Action(SetCurrentPatientIdAction)
  setCurrentPatientId({ getState, patchState, dispatch }: StateContext<PatientsStateModel>, { payload }: SetCurrentPatientIdAction) {
    patchState({ currentPatientId: payload });
    this.persistenceService.serializeState(payload);
  }

  @Action(SetPatientsAction)
  setPatients({ getState, patchState, dispatch }: StateContext<PatientsStateModel>, { payload }: SetPatientsAction) {
    patchState({ patients: payload });
  }

}
