import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetPatients } from './patients.actions';
import { Patient } from './patient/patient.model';
import { NgForage } from 'ngforage';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private patientsList = [
    <Patient>{
      id: 1,
      name: 'Sam',
      role: 'developer'
    },
    <Patient>{
      id: 2,
      name: 'Jurgen',
      role: 'architect'
    }
  ];

  constructor(private readonly ngf: NgForage,
              private readonly store: Store) {
    this.getPatients();
  }

  private getPatients() {
    this.store.dispatch(new SetPatients(this.patientsList));
  }

}
