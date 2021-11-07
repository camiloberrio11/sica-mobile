import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ButtonItemMenuComponent } from './button-item-menu/button-item-menu.component';
import { IonicModule } from '@ionic/angular';
import { FormStepComponent } from './form-step/form-step.component';

@NgModule({
  declarations: [HeaderComponent, ButtonItemMenuComponent, FormStepComponent],
  imports: [CommonModule, IonicModule],
  exports: [HeaderComponent, ButtonItemMenuComponent, FormStepComponent],
})
export class SharedModule {}
