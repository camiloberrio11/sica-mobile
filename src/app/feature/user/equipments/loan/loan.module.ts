import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoanPageRoutingModule } from './loan-routing.module';

import { LoanPage } from './loan.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoanPageRoutingModule,
    SharedModule
  ],
  declarations: [LoanPage]
})
export class LoanPageModule {}
