import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';

import { PatientsRoutingModule } from './patients-routing.module';
import { OneComponent } from './one/one.component';
import { TwoComponent } from './two/two.component';
import { PatientsComponent } from './patients.component';
import { PatientComponent } from './patient/patient.component';
import { DummyComponent } from './dummy.component';
import { PatientsState } from './patients.state';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { PatientResolver } from './patient/patient.resolver';
import { PatientsService } from './patients.service';
import { PatientsPersistanceService } from './patients-persistance.service';

const COMPONENTS = [
  OneComponent, TwoComponent, PatientsComponent, PatientComponent, PatientsListComponent
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
    ...COMPONENTS,
    DummyComponent
  ],
  exports: [
    ...COMPONENTS
  ],
  providers: [
    PatientResolver
  ]
})
export class PatientsModule {
  constructor(private readonly patientsService: PatientsService,
              private readonly patientsPersistanceService: PatientsPersistanceService) {
  }
}
