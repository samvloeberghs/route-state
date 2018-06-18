import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { AComponent } from './a/a.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'b',
        pathMatch: 'full'
      },
      {
        path: 'a',
        loadChildren: './a/a.module#AModule'
      },
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
}
