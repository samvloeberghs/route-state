import { PatientState } from '../patients.state';

export interface Patient {
  id: number;
  name: string;
  role: string;
  state?: PatientState;
}
