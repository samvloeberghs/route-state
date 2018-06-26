import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DummyComponent } from './dummy.component';
import { ItemResolver } from './item/item.resolver';

const routes: Routes = [
  {
    path: 'a',
    component: DummyComponent,
    children: [
      {
        path: 'item/:itemId',
        component: DummyComponent,
        resolve:{
          itemSet: ItemResolver
        },
        children: [
          {
            path: '',
            redirectTo: 'one',
            pathMatch: 'full'
          },
          {
            path: 'one',
            component: DummyComponent
          },
          {
            path: 'two',
            component: DummyComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ARoutingModule {
}
