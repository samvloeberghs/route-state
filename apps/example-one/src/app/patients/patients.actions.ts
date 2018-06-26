import { Patient } from './patient/patient.model';

export class SetCurrentPatientIdAction {
  static readonly type = '[PatientsState] SET_CURRENT_PATIENT_ID';

  constructor(public payload: number) {
  }
}

export class SetPatientsAction {
  static readonly type = '[PatientsState] SET_PATIENTS';

  constructor(public payload: Patient[]) {
  }
}
