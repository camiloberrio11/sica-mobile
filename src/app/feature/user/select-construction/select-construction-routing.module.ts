import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectConstructionPage } from './select-construction.page';

const routes: Routes = [
  {
    path: '',
    component: SelectConstructionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectConstructionPageRoutingModule {}
