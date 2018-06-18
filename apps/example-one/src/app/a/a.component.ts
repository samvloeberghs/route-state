import { Component, OnInit } from '@angular/core';
import { ItemsService } from './items.service';
import { Item } from './item/item.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'e1-a',
  templateUrl: './a.component.html',
  styles: []
})
export class AComponent implements OnInit {

  items: Item[];

  constructor(public itemsService: ItemsService) {
  }

  ngOnInit() {

  }

}
