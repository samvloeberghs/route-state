import { Component, OnDestroy, OnInit } from '@angular/core';
import { ItemsService } from './items.service';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { ItemsState, ItemsStateModel } from './items.state';
import { SetItemUrlStateAction } from './item/item.actions';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Item } from './item/item.model';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'e1-a',
  templateUrl: './a.component.html',
  styles: []
})
export class AComponent {

  constructor(public itemsService: ItemsService) {

  }

}
