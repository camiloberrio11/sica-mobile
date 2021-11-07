import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ButtonItemMenuComponent } from './button-item-menu/button-item-menu.component';
import { IonicModule } from '@ionic/angular';
import { FormStepComponent } from './form-step/form-step.component';
import { InputGeneralComponent } from './input-general/input-general.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ButtonItemMenuComponent,
    FormStepComponent,
    InputGeneralComponent,
  ],
  imports: [CommonModule, IonicModule],
  exports: [
    HeaderComponent,
    ButtonItemMenuComponent,
    FormStepComponent,
    InputGeneralComponent,
  ],
})
export class SharedModule {}
