import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OwnEquipmentPage } from './own-equipment.page';

const routes: Routes = [
  {
    path: '',
    component: OwnEquipmentPage
  },
  {
    path: 'history',
    loadChildren: () => import('./history/history.module').then( m => m.HistoryPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnEquipmentPageRoutingModule {}
