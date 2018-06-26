import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DummyComponent } from './dummy.component';
import { PatientResolver } from './patient/patient.resolver';

const routes: Routes = [
  {
    path: 'patients',
    component: DummyComponent,
    children: [
      {
        path: ':patientId',
        component: DummyComponent,
        resolve:{
          patientSet: PatientResolver
        },
        children: [
          {
            path: '',
            redirectTo: 'one',
            pathMatch: 'full'
          },
          {
            path: 'one',
            component: DummyComponent
          },
          {
            path: 'two',
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
