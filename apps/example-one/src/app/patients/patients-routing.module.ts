import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DummyComponent } from './dummy.component';
import { PatientResolver } from './patient/patient.resolver';
import { JournalResolver } from './journal/journal.resolver';
import { CanActivateFicheGuard } from './fiche/can-activate-fiche.guard';

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
            /*
            The dummy component is used here because leaf routes
            in a routing tree require an attached component
             */
            component: DummyComponent,
            canActivate: [
              CanActivateFicheGuard
            ]
          },
          {
            path: 'journal',
            /*
            The dummy component is used here because leaf routes
            in a routing tree require an attached component
            */
            component: DummyComponent,
            resolve:{
              partSet: JournalResolver
            },
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    PatientResolver,
    CanActivateFicheGuard,
    JournalResolver
  ]
})
export class PatientsRoutingModule {
}
