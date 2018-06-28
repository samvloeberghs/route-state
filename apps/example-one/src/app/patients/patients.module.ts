import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';

import { PatientsRoutingModule } from './patients-routing.module';
import { FicheComponent } from './fiche/fiche.component';
import { JournalComponent } from './journal/journal.component';
import { PatientsComponent } from './patients.component';
import { PatientComponent } from './patient/patient.component';
import { DummyComponent } from './dummy.component';
import { PatientsState } from './patients.state';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { PatientsService } from './patients.service';
import { PatientsPersistenceService } from './patients-persistence.service';

const COMPONENTS = [
  FicheComponent, JournalComponent, PatientsComponent, PatientComponent, PatientsListComponent, DummyComponent
];

const EXPORT_COMPONENTS = [
  PatientsListComponent, PatientsComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PatientsRoutingModule,
    NgxsModule.forFeature([
      PatientsState
    ])
  ],
  declarations: [
    ...COMPONENTS
  ],

  /*
  We need to export the components that are used outside of the app module's context
  For example: PatientListComponent is used in the root module because we want to have it always shown,
  independend of patients state or selected route
   */
  exports: [
    ...EXPORT_COMPONENTS
  ]

})
export class PatientsModule {

  /*
  Note #1:

  The patientsService is injected to feed the store with some test patientData.
  This can be done at any point in time, but preferably as soon as possible in the startup of the applicaton.

  Note #2:

  We inject the appPersistanceService here because we want to instantiate it
  as soon as the app module loads => it unserializes the browser storage cache
   */
  constructor(private readonly patientsService: PatientsService,
              private readonly patientsPersistenceService: PatientsPersistenceService) {
  }
}
