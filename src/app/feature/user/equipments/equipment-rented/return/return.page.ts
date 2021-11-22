import { Component, OnInit } from '@angular/core';
import { ToolByBarcodeResponseService } from 'src/app/core/models/Tool';
import { User } from 'src/app/core/models/User';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SicaBackendService } from 'src/app/core/services/sica-backend.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-return',
  templateUrl: './return.page.html',
  styleUrls: ['./return.page.scss'],
})
export class ReturnPage {
  listAddedEquipments: { name: string }[] = [];
  listSupplier: { id: string; value: string }[] = [];
  constructor(
    private loadingService: LoadingService,
    private sicaBackend: SicaBackendService,
    private toastrService: ToastService
  ) {}

  ionViewDidEnter() {
    this.getSupplier();
  }

  addEquipment(): void {
    this.listAddedEquipments.push({
      name: `Test prueba agregado ${this.listAddedEquipments?.length + 1}`,
    });
  }

  save(): void {
    alert('Guardado');
  }

  sendEmail(): void {
    alert('Correo enviado');
  }

  handleCodebar(result: ToolByBarcodeResponseService): void {
    console.log(result);
  }

  handleInpput(value: string) {}

  handleNfc(nfcValue: User) {}
  async getSupplier(): Promise<void> {
    await this.loadingService.initLoading('Obteniendo proveedor');
    this.sicaBackend.getSupplier().subscribe(
      async (sup) => {
        this.listSupplier = sup.map((it) => {
          const item = {
            id: it.id,
            value: it.name,
          };
          return item;
        });
        await this.loadingService.endLoading();
      },
      async (err) => {
        await this.toastrService.createToast(
          'Ocurrió error obteniendo proveedores',
          'warning'
        );
        await this.loadingService.endLoading();
      }
    );
  }
}
