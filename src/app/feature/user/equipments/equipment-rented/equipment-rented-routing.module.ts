import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipmentRentedPage } from './equipment-rented.page';

const routes: Routes = [
  {
    path: '',
    component: EquipmentRentedPage
  },
  {
    path: 'entry',
    loadChildren: () => import('./entry/entry.module').then( m => m.EntryPageModule)
  },
  {
    path: 'return',
    loadChildren: () => import('./return/return.module').then( m => m.ReturnPageModule)
  },
  {
    path: 'pre-settlement',
    loadChildren: () => import('./pre-settlement/pre-settlement.module').then( m => m.PreSettlementPageModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then( m => m.ReportsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipmentRentedPageRoutingModule {}
