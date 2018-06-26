import { Component, OnInit } from '@angular/core';
import { SetCurrentItemIdAction } from '../items.actions';
import { MODULE } from '../../app.component';
import { SetCurrentSelectedModuleAction } from '../../app.actions';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Item } from '../item/item.model';

@Component({
  selector: 'e1-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  @Select(state => state.ItemsState.items) items$: Observable<Item>;

  constructor(private store: Store) {
  }

  ngOnInit() {
  }

  selectItem($event, id: number) {
    this.store.dispatch(new SetCurrentSelectedModuleAction(MODULE.A));
    this.store.dispatch(new SetCurrentItemIdAction(id));
  }

}
