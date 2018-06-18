import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ItemsService } from './items.service';
import { Item } from './item/item.model';
import { Observable } from 'rxjs';

@Injectable()
export class ItemsResolver implements Resolve<Item[]> {

  constructor(private itemsService: ItemsService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Item[]> {
    return this.itemsService.getItems();
  }

}
