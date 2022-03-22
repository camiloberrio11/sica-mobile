import { CaptureReaderNfcComponent } from './capture-reader-nfc/capture-reader-nfc.component';
import { CaptureImageComponent } from './capture-image/capture-image.component';
import { ButtonAddComponent } from './button-add/button-add.component';
import { SelectCustomComponent } from './select-custom/select-custom.component';
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
import { IonicSelectableModule } from 'ionic-selectable';
import { FormsModule } from '@angular/forms';

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
    CheckboxComponent,
    SelectCustomComponent,
    ButtonAddComponent,
    CaptureImageComponent,
    CaptureReaderNfcComponent,
  ],
  imports: [CommonModule, IonicModule, IonicSelectableModule, FormsModule],
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
    CheckboxComponent,
    SelectCustomComponent,
    ButtonAddComponent,
    CaptureImageComponent,
    CaptureReaderNfcComponent,
  ],
})
export class SharedModule {}
