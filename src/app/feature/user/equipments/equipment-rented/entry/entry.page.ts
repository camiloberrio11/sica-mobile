import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SicaBackendService } from 'src/app/core/services/sica-backend.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.page.html',
  styleUrls: ['./entry.page.scss'],
})
export class EntryPage implements OnInit {
  listSupplier: { id: string; value: string }[] = [];
  listAddedEquipments: {name: string}[] = [];

  constructor(
    private loadingService: LoadingService,
    private sicaBackend: SicaBackendService
  ) {}

  ngOnInit() {
  }

  ionViewDidEnter(): void {
    this.getSupplier();
  }

  save(): void {
    alert('Guardado');
  }

  sendEmail(): void {
    alert('Enviado al correo');
  }

  handleAdd(): void {
    this.listAddedEquipments.push({name: `Prueba agregada ${this.listAddedEquipments.length + 1}`});
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
        await this.loadingService.endLoading();
      }
    );
  }

}
