import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OwnEquipmentPageRoutingModule } from './own-equipment-routing.module';

import { OwnEquipmentPage } from './own-equipment.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OwnEquipmentPageRoutingModule,
    SharedModule
  ],
  declarations: [OwnEquipmentPage]
})
export class OwnEquipmentPageModule {}
