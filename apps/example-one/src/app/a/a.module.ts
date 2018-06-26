import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';

import { ARoutingModule } from './a-routing.module';
import { OneComponent } from './one/one.component';
import { TwoComponent } from './two/two.component';
import { AComponent } from './a.component';
import { ItemComponent } from './item/item.component';
import { DummyComponent } from './dummy.component';
import { ItemsState } from './items.state';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemResolver } from './item/item.resolver';
import { ItemsService } from './items.service';

const COMPONENTS = [
  OneComponent, TwoComponent, AComponent, ItemComponent, ItemListComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ARoutingModule,
    NgxsModule.forFeature([
      ItemsState
    ])
  ],
  declarations: [
    ...COMPONENTS,
    DummyComponent
  ],
  exports: [
    ...COMPONENTS
  ],
  providers: [
    ItemResolver
  ]
})
export class AModule {
  constructor(private readonly itemsService: ItemsService) {
  }
}
