import { Patient } from './patient/patient.model';

export class SetCurrentPatientId {
  static readonly type = '[PatientsState] Set Current Patient Id';

  constructor(public payload: number) {
  }
}

export class SetPatients {
  static readonly type = '[PatientsState] Set Patients';

  constructor(public payload: Patient[]) {
  }
}
