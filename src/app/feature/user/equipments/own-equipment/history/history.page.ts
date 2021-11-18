import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToolByBarcodeResponseService } from 'src/app/core/models/Tool';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage {
  toolFindByCodeBar: ToolByBarcodeResponseService;

  constructor(private cd: ChangeDetectorRef) {}

  send(): void {
    alert('Informe enviado');
  }

  getEquipmentByCodeBar(toolByBarcode: ToolByBarcodeResponseService): void {
    this.toolFindByCodeBar = toolByBarcode;
    this.cd?.detectChanges();
  }
}
