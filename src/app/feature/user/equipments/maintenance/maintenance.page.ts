import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SicaBackendService } from 'src/app/core/services/sica-backend.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.page.html',
  styleUrls: ['./maintenance.page.scss'],
})
export class MaintenancePage implements OnInit {
  listSupplier: { id: string; value: string }[] = [];
  constructor(
    private loadingService: LoadingService,
    private sicaBackend: SicaBackendService
  ) {}

  ngOnInit() {
    this.getSupplier();
  }

  async getSupplier(): Promise<void> {
    this.loadingService.initLoading('Obteniendo proveedor');
    this.sicaBackend.getSupplier().subscribe(
      async (sup) => {
        this.listSupplier = sup.map((it) => {
          const item = {
            id: it.id,
            value: it.name,
          };
          return item;
        });
        this.loadingService.endLoading();
      },
      async (err) => {
        this.loadingService.endLoading();
      }
    );
  }
}
