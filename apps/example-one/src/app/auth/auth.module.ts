import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';

import { LoginComponent } from './login/login.component';
import { AuthState } from './auth.state';

const COMPONENTS = [
  LoginComponent
];

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forFeature([
      AuthState
    ])
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class AuthModule {
}
