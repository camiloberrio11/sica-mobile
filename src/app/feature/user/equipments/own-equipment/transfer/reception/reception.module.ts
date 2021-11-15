import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceptionPageRoutingModule } from './reception-routing.module';

import { ReceptionPage } from './reception.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceptionPageRoutingModule,
    SharedModule
  ],
  declarations: [ReceptionPage]
})
export class ReceptionPageModule {}
