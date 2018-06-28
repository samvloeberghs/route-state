import { Injectable } from '@angular/core';
import { NgForage } from 'ngforage';
import { Store } from '@ngxs/store';

import { SetCurrentSelectedModule } from './app.actions';
import { MODULE } from './app.state';

export enum APP_PERSISTENCE {
  CURRENT_MODULE = 'CURRENT_MODULE'
}

@Injectable({
  providedIn: 'root'
})
export class AppPersistenceService {

  constructor(private readonly ngf: NgForage,
              private readonly store: Store) {

    /*
    See injection in app.module.ts
    => this unserializes the data while bootstrapping the app module
     */
    this.unserialize();
  }

  serializeState(currentModule: MODULE) {
    if (!!currentModule) {
      this.ngf.setItem(APP_PERSISTENCE.CURRENT_MODULE, currentModule);
    } else {
      this.ngf.removeItem(APP_PERSISTENCE.CURRENT_MODULE);
    }
  }

  private unserialize() {
    this.ngf.getItem<MODULE>(APP_PERSISTENCE.CURRENT_MODULE).then((currentModule) => {
      if (!!currentModule) {
        this.store.dispatch(new SetCurrentSelectedModule(currentModule));
      }
    });
  }

}
