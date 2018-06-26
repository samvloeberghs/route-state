import { Component, Input, OnInit } from '@angular/core';
import { Item } from './item.model';

enum ITEMPART {
  PARTONE = 'e1-one',
  PARTTWO = 'e1-two'
}

@Component({
  selector: 'e1-item',
  templateUrl: './item.component.html',
  styles: []
})
export class ItemComponent implements OnInit {

  @Input() item: Item;

  ITEMPART = ITEMPART;
  selectedItemPart = ITEMPART.PARTONE;


  constructor() {
  }

  ngOnInit() {


  }

  // TODO: set in state machine
  selectPart($event, part: ITEMPART) {
    this.selectedItemPart = part;
  }

}
