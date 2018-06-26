import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgForageConfig } from 'ngforage';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AModule } from './a/a.module';
import { AppState } from './app.state';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NxModule.forRoot(),

    NgxsModule.forRoot([
      AppState
    ]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    }),

    /*
    We don't lazyload the AModule, because it's our base functionality
    + we want to use it outside of it's route.
     */
    AModule,

    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'b',
        pathMatch: 'full'
      },

      /*
      Every other module can still be lazy loaded
      Like with the BModule ( which is our default route )
       */
      {
        path: 'b',
        loadChildren: './b/b.module#BModule'
      }

    ], { initialNavigation: 'enabled' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngfConfig: NgForageConfig) {
    ngfConfig.configure({
      name: 'items'
    });
  }
}
