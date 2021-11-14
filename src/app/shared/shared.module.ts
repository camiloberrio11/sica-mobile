import { CheckboxComponent } from './checkbox/checkbox.component';
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
import { InputCodebarComponent } from './input-codebar/input-codebar.component';
import { InputLabelNfcComponent } from './input-label-nfc/input-label-nfc.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ButtonItemMenuComponent,
    FormStepComponent,
    InputGeneralComponent,
    CardDetailEquipmentComponent,
    InputObservationsComponent,
    BoxQuantityComponent,
    InputCodebarComponent,
    InputLabelNfcComponent,
    CheckboxComponent
  ],
  imports: [CommonModule, IonicModule],
  exports: [
    HeaderComponent,
    ButtonItemMenuComponent,
    FormStepComponent,
    InputGeneralComponent,
    CardDetailEquipmentComponent,
    InputObservationsComponent,
    BoxQuantityComponent,
    InputCodebarComponent,
    InputLabelNfcComponent,
    CheckboxComponent
  ],
})
export class SharedModule {}
