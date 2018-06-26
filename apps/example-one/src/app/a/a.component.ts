import { Component, OnInit } from '@angular/core';
import { ItemsService } from './items.service';
import { StateService } from './state.service';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Item } from './item/item.model';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';

@Component({
  selector: 'e1-a',
  templateUrl: './a.component.html',
  styles: []
})
export class AComponent implements OnInit {

  @Select(state => state.ItemsState.currentItemId) currentItemId$: Observable<number>;
  @Select(state => state.ItemsState.items) items$: Observable<Item>;

  constructor(public itemsService: ItemsService,
              private store: Store,
              private stateService: StateService,
              private router: Router) {
  }

  ngOnInit() {

    /*
    this.store.select(state => state.ItemsState)
      .pipe(
        filter(_ => !!_.currentItemId),
        distinctUntilChanged((a, b) => a.currentItemId === b.currentItemId)
      )
      .subscribe((currentItemState) => {
        if (currentItemState.url) {
          this.router.navigateByUrl(currentItemState.url);
        }
      });
    */
  }

  trackByItem(index, item: Item) {
    return item.id;
  }

}
