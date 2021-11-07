import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectFlowPage } from './select-flow.page';

const routes: Routes = [
  {
    path: '',
    component: SelectFlowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectFlowPageRoutingModule {}
