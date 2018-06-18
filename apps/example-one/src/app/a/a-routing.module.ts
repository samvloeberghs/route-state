import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TwoComponent } from './two/two.component';
import { AComponent } from './a.component';
import { ItemComponent } from './item/item.component';
import { OneComponent } from './one/one.component';
import { ItemResolver } from './item/item.resolver';
import { ItemsResolver } from './items.resolver';

const routes: Routes = [
  {
    path: '',
    component: AComponent,
    resolve: {
      items: ItemsResolver
    },
    children: [
      {
        path: 'item/:itemId',
        component: ItemComponent,
        resolve: {
          item: ItemResolver
        },
        children: [
          {
            path: '',
            redirectTo: 'one',
            pathMatch: 'full'
          },
          {
            path: 'one',
            component: OneComponent
          },
          {
            path: 'two',
            component: TwoComponent
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
