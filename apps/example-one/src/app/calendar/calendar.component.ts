import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

import { SetCurrentSelectedModule } from '../app.actions';
import { MODULE } from '../app.state';

@Component({
  selector: 'e1-calendar',
  templateUrl: './calendar.component.html',
  styles: []
})
export class CalendarComponent implements OnInit {

  constructor(private store: Store) {

  }

  ngOnInit() {
    this.store.dispatch(new SetCurrentSelectedModule(MODULE.CALENDAR));
  }

}
