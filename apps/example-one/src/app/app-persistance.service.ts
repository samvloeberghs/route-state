import { Injectable } from '@angular/core';
import { NgForage } from 'ngforage';
import { Store } from '@ngxs/store';

import { SetCurrentSelectedModuleAction } from './app.actions';
import { MODULE } from './app.state';

export enum APP_PERSISTANCE {
  CURRENT_MODULE = 'CURRENT_MODULE'
}

@Injectable({
  providedIn: 'root'
})
export class AppPersistanceService {

  constructor(private readonly ngf: NgForage,
              private store: Store) {
    this.unserialize();
  }

  serializeState(currentModule: MODULE) {
    if (!!currentModule) {
      this.ngf.setItem(APP_PERSISTANCE.CURRENT_MODULE, currentModule);
    } else {
      this.ngf.removeItem(APP_PERSISTANCE.CURRENT_MODULE);
    }
  }

  private unserialize() {
    this.ngf.getItem<MODULE>(APP_PERSISTANCE.CURRENT_MODULE).then((currentModule) => {
      if (!!currentModule) {
        this.store.dispatch(new SetCurrentSelectedModuleAction(currentModule));
      }
    });
  }

}
