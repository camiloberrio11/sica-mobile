import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ButtonItemMenuComponent } from './button-item-menu/button-item-menu.component';
import { IonicModule } from '@ionic/angular';
import { FormStepComponent } from './form-step/form-step.component';
import { InputGeneralComponent } from './input-general/input-general.component';
import { CardDetailEquipmentComponent } from './card-detail-equipment/card-detail-equipment.component';
import { InputObservationsComponent } from './input-observations/input-observations.component';
import { BoxQuantityComponent } from './box-quantity/box-quantity.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ButtonItemMenuComponent,
    FormStepComponent,
    InputGeneralComponent,
    CardDetailEquipmentComponent,
    InputObservationsComponent,
    BoxQuantityComponent
  ],
  imports: [CommonModule, IonicModule],
  exports: [
    HeaderComponent,
    ButtonItemMenuComponent,
    FormStepComponent,
    InputGeneralComponent,
    CardDetailEquipmentComponent,
    InputObservationsComponent,
    BoxQuantityComponent
  ],
})
export class SharedModule {}
