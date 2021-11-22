import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SicaBackendService } from 'src/app/core/services/sica-backend.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-return',
  templateUrl: './return.page.html',
  styleUrls: ['./return.page.scss'],
})
export class ReturnPage implements OnInit {
  listAddedEquipments: {name: string}[] = [];
  listSupplier: { id: string; value: string }[] = [];
  constructor(
    private loadingService: LoadingService,
    private sicaBackend: SicaBackendService,
    private toastrService: ToastService

  ) {}

  ngOnInit() {}

  addEquipment(): void {
    this.listAddedEquipments.push({name: `Test prueba agregado ${this.listAddedEquipments?.length + 1}`});
  }

  save(): void {
    alert('Guardado');
  }

  sendEmail(): void {
    alert('Correo enviado');
  }

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
