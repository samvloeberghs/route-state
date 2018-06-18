import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from './item.model';
import { distinctUntilChanged, filter, take } from 'rxjs/operators';
import { StateService } from '../state.service';
import { ItemState } from './item.state';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'e1-item',
  templateUrl: './item.component.html',
  styles: []
})
export class ItemComponent implements OnInit {

  item: Item;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: { item: Item }) => {
      this.item = data.item;
    });
  }

}
