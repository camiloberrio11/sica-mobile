import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreSettlementPage } from './pre-settlement.page';

const routes: Routes = [
  {
    path: '',
    component: PreSettlementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreSettlementPageRoutingModule {}
