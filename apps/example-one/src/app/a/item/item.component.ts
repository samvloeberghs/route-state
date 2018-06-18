import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from './item.model';

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
