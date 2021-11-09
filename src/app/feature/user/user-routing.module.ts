import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPage } from './user.page';

const routes: Routes = [
  {
    path: '',
    component: UserPage,
    children: [
      {
        path: 'select-construction',
        loadChildren: () =>
          import('./select-construction/select-construction.module').then(
            (m) => m.SelectConstructionPageModule
          ),
      },
      {
        path: 'select-flow',
        loadChildren: () => import('./select-flow/select-flow.module').then( m => m.SelectFlowPageModule)
      },
      {
        path: 'menu-equipments',
        loadChildren: () => import('./equipments/menu/menu.module').then( m => m.MenuPageModule)
      },
      {
        path: 'loan-equipment',
        loadChildren: () => import('./equipments/loan/loan.module').then( m => m.LoanPageModule)
      },
      {
        path: 'create-token',
        loadChildren: () => import('./tokens/create/create.module').then( m => m.CreatePageModule)
      },
    ],
  },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPageRoutingModule {}
