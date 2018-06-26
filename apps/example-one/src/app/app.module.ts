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
import { AppState } from './app.state';
import { PatientsModule } from './patients/patients.module';
import { AuthModule } from './auth/auth.module';
import { AppPersistanceService } from './app-persistance.service';

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

    AuthModule,

    /*
    We don't lazyload the PatientsModule, because it's our base functionality
    + we want to use it outside of it's route.
     */
    PatientsModule,

    RouterModule.forRoot([
      {
        path: '',

        /*
        Redirecting to calendar for demo purposes
        This lazy loads this module
         */
        redirectTo: 'calendar',
        pathMatch: 'full'

      },

      /*
      Every other module can still be lazy loaded
      Like with the CalendarModule ( which is our default route )
       */
      {
        path: 'calendar',
        loadChildren: './calendar/calendar.module#CalendarModule'
      }

    ], { initialNavigation: 'enabled' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private readonly ngfConfig: NgForageConfig,
              private readonly appPersistanceService: AppPersistanceService) {

    ngfConfig.configure({
      name: 'e1'
    });

  }
}
