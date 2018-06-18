import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { RouterStateSnapshot } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'e1-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  route$: Observable<RouterStateSnapshot>;

  constructor(private store: Store) {
    this.route$ = this.store.select(route => route)
      .pipe(
        tap(route => console.log(route))
      );
  }

}
