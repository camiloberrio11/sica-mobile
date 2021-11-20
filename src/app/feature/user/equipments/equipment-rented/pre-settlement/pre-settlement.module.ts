import { SharedModule } from './../../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreSettlementPageRoutingModule } from './pre-settlement-routing.module';

import { PreSettlementPage } from './pre-settlement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreSettlementPageRoutingModule,
    SharedModule
  ],
  declarations: [PreSettlementPage]
})
export class PreSettlementPageModule {}
