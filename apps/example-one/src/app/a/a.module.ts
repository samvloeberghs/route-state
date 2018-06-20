import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ARoutingModule } from './a-routing.module';
import { OneComponent } from './one/one.component';
import { TwoComponent } from './two/two.component';
import { AComponent } from './a.component';
import { ItemComponent } from './item/item.component';
import { ItemResolver } from './item/item.resolver';
import { ItemsResolver } from './items.resolver';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { ItemsState } from './items.state';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ARoutingModule,
    NgxsModule.forFeature([
      ItemsState
    ]),
  ],
  declarations: [OneComponent, TwoComponent, AComponent, ItemComponent],
  providers: [ItemResolver, ItemsResolver]
})
export class AModule {
}
