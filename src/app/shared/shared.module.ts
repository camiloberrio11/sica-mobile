import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ButtonItemMenuComponent } from './button-item-menu/button-item-menu.component';

@NgModule({
  declarations: [HeaderComponent, ButtonItemMenuComponent],
  imports: [CommonModule],
  exports: [HeaderComponent, ButtonItemMenuComponent],
})
export class SharedModule {}
