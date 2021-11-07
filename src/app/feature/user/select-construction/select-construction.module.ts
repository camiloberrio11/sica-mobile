import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectConstructionPageRoutingModule } from './select-construction-routing.module';

import { SelectConstructionPage } from './select-construction.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectConstructionPageRoutingModule,
    SharedModule
  ],
  declarations: [SelectConstructionPage]
})
export class SelectConstructionPageModule {}
