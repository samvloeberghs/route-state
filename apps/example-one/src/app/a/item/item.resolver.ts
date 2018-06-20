import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ItemsService } from '../items.service';
import { Item } from './item.model';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { SetCurrentIdAction } from './item.actions';

@Injectable()
export class ItemResolver implements Resolve<Item> {

  constructor(private itemsService: ItemsService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Item> {

    return this.itemsService.getItem(+route.params.itemId);
  }

}
