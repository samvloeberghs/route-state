import { Patient } from './patient/patient.model';
import { PATIENTPART } from './patients.state';

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

export class SetPatientPart {
  static readonly type = '[PatientsState] Set Selected Part Patient';

  constructor(public payload: { patient: Patient, part: PATIENTPART }) {
  }
}
