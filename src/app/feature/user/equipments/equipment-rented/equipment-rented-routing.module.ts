import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipmentRentedPage } from './equipment-rented.page';

const routes: Routes = [
  {
    path: '',
    component: EquipmentRentedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipmentRentedPageRoutingModule {}
