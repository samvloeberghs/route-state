import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { RouterStateSnapshot } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RouterState } from '@ngxs/router-plugin';

@Component({
  selector: 'e1-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {
  }

}
