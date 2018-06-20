import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from './item.model';
import { combineLatest, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, switchMap, take } from 'rxjs/operators';
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

      this.store.select(state => state.a)
        .pipe(
          take(1)
        )
        .subscribe(state => {
          const thisItem = state.items.find((item: Item) => {
            return item.id === state.currentId;
          });
          if (thisItem && thisItem.url) {
            this.router.navigateByUrl(thisItem.url);
          }
        });

    });

    this.subscriptions.push(
      this.store.select(state => state.a.currentId).pipe(
        switchMap((currentId) => {
          return this.store.select(state => state.router);
        }),
        take(1),
        filter(_ => !!_),
        filter(routerState => {
          return routerState.state.url.indexOf('/a/') > -1;
        })
      ).subscribe((routerState) => {
        this.store.dispatch(new SetItemUrlStateAction({
          url: routerState.state.url
        }));

      })
    );

  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
