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
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then( m => m.ReportsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'transfer',
    loadChildren: () => import('./transfer/transfer.module').then( m => m.TransferPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnEquipmentPageRoutingModule {}
