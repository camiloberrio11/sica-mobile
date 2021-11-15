import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquipmentRentedPageRoutingModule } from './equipment-rented-routing.module';

import { EquipmentRentedPage } from './equipment-rented.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EquipmentRentedPageRoutingModule,
    SharedModule
  ],
  declarations: [EquipmentRentedPage]
})
export class EquipmentRentedPageModule {}
