import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, take } from 'rxjs/operators';
import { Router } from '@angular/router';

import { SetCurrentSelectedModule } from './app.actions';
import { MODULE } from './app.state';

@Component({
  selector: 'e1-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  MODULE = MODULE;
  @Select(state => state.AppState.selectedModule) selectedModule$: Observable<MODULE>;

  constructor(private readonly router: Router,
              private readonly store: Store) {
  }

  selectModule($event, part: MODULE) {
    this.store.select(state => state.PatientsState.currentPatientId)
      .pipe(
        distinctUntilChanged(),
        take(1)
      )
      .subscribe(currentPatientId => {
        this.store.dispatch(new SetCurrentSelectedModule(part));
        if (!!currentPatientId && part === MODULE.PATIENTS) {
          this.router.navigate(['patients', currentPatientId]);
        }
      });
  }

}
