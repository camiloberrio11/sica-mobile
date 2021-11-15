import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SicaBackendService } from 'src/app/core/services/sica-backend.service';
type MaintenanceType = 'maintenance' | 'reparation';

interface Equipment {
  name: string;
}

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.page.html',
  styleUrls: ['./maintenance.page.scss'],
})
export class MaintenancePage implements OnInit {
  indexStep = 0;
  menuFormStep: string[] = ['Equipo', 'Finalizar'];
  stepEnd = false;
  typeMaintenance: MaintenanceType = 'reparation';
  listSupplier: { id: string; value: string }[] = [];
  listAddedEquipment: Equipment[] = [{ name: 'TALADRO - 1 - 543' }];
  constructor(
    private loadingService: LoadingService,
    private sicaBackend: SicaBackendService
  ) {}

  ngOnInit() {
    this.getSupplier();
  }

  currentIndexStepForm(event: number) {
    this.stepEnd = this.indexStep + 1 === this.menuFormStep?.length;
    this.indexStep = event;
  }

  inputChange(event: string, formcontrolname?: string): void {
    // this.formDelivery.patchValue({
    //   [formcontrolname]: event,
    // });
  }

  nextStep(): void {
    if (this.stepEnd) {
      // this.sendRequest();
      return;
    }
    this.indexStep = this.indexStep + 1;
  }

  sendEmail(): void {
    alert('Email enviado');
  }

  changeCheckbox(event: string) {
    const value: any = event;
    this.typeMaintenance = value;
  }

  addEquipment(): void {
    this.listAddedEquipment.push({name: 'TEST PRUEBA ADD ITEM'})
  }

  async getSupplier(): Promise<void> {
    // this.loadingService.initLoading('Obteniendo proveedor');
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
