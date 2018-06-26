import { Component } from '@angular/core';
import { Item } from './a/item/item.model';
import { SetCurrentItemIdAction } from './a/items.actions';
import { Select, Store } from '@ngxs/store';
import { SetCurrentSelectedModuleAction } from './app.actions';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, take } from 'rxjs/operators';
import { Router } from '@angular/router';

export enum MODULE {
  A = 'e1-a',
  B = 'e1-b'
}

@Component({
  selector: 'e1-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  MODULE = MODULE;
  @Select(state => state.AppState.selectedModule) selectedModule$: Observable<MODULE>;

  constructor(private router: Router,
              private readonly store: Store) {
  }

  selectModule($event, part: MODULE) {
    this.store.select(state => state.ItemsState.currentItemId)
      .pipe(
        distinctUntilChanged(),
        take(1)
      )
      .subscribe(currentItemId => {
        this.store.dispatch(new SetCurrentSelectedModuleAction(part));
        if (!!currentItemId && part === MODULE.A) {
          this.router.navigate(['a', 'item', currentItemId]);
          this.store.dispatch(new SetCurrentItemIdAction(currentItemId));
        }
      });
  }

  trackByItem(index, item: Item) {
    return item.id;
  }

}
