import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from './item.model';
import { combineLatest, Subscription } from 'rxjs';
import { distinct, distinctUntilChanged, filter, switchMap, take } from 'rxjs/operators';
import { SetItemUrlStateAction } from './item.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'e1-item',
  templateUrl: './item.component.html',
  styles: []
})
export class ItemComponent implements OnInit, OnDestroy {

  item: Item;
  private subscriptions: Subscription[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private store: Store,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: { item: Item }) => {
      this.item = data.item;

      this.subscriptions.forEach(sub => sub.unsubscribe());

      /*
       If we are in item.component
       we want to be updated if we go from one to two, or vice versa
       in that case we want to update the url of the item
        */

      this.subscriptions.push(
        combineLatest(
          this.store.select(state => state.a).pipe(
            take(1)
          ),
          this.store.select(state => state.router).pipe(
            filter(_ => !!_),
            filter(routerState => {
              return routerState.state.url.indexOf('/a/') > -1;
            })
          )
        ).pipe(
          distinctUntilChanged((a, b) => {
            return a[0].currentId !== b[0].currentId;
          })
        ).subscribe(([state, routerState]) => {

          const thisItem = state.items.find((item: Item) => {
            return item.id === state.currentId;
          });

          if (thisItem && thisItem.url) {
            if (thisItem.url !== routerState.state.url) {
              this.router.navigateByUrl(thisItem.url);
            }
          }

        })
      );

    });

  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
