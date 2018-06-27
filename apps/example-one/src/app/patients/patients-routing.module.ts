import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DummyComponent } from './dummy.component';
import { PatientResolver } from './patient/patient.resolver';

const routes: Routes = [
  {
    path: 'patients',
    children: [
      {
        path: ':patientId',
        resolve:{
          patientSet: PatientResolver
        },
        children: [
          {
            path: '',
            redirectTo: 'fiche',
            pathMatch: 'full'
          },
          {
            path: 'fiche',
            component: DummyComponent
          },
          {
            path: 'journal',
            component: DummyComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule {
}
