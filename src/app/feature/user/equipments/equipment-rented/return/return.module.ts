import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReturnPageRoutingModule } from './return-routing.module';

import { ReturnPage } from './return.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReturnPageRoutingModule,
    SharedModule
  ],
  declarations: [ReturnPage]
})
export class ReturnPageModule {}
