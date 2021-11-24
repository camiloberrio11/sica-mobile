import { Component, OnInit } from '@angular/core';
import { MaintenanceBodyCreate } from 'src/app/core/models/Maintenance';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SicaBackendService } from 'src/app/core/services/sica-backend.service';
import { ToastService } from 'src/app/core/services/toast.service';
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
  listAddedEquipment: MaintenanceBodyCreate[] = [];
  constructor(
    private loadingService: LoadingService,
    private sicaBackend: SicaBackendService,
    private toastrService: ToastService
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
      this.sendRequest();
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
    const body: MaintenanceBodyCreate = {
      invoice: {
        date: '23Nov21',
        number: 1123,
        supplier: '{{supplierId1}}',
        price: 80000,
        warranty: 6,
      },
      remark: '',
      construction: '{{constructionId2}}',
      tool: '{{toolId1}}',
    };
    this.listAddedEquipment.push(body);
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

  private async sendRequest(): Promise<void> {
    if (this.listAddedEquipment?.length < 0) {
      this.toastrService.createToast('No has agregado ningún equipo', 'warning');
      return;
    }
    for (const iterator of this.listAddedEquipment) {
      await this.loadingService.initLoading('Enviando a mantenimiento');
      try {
        await this.sicaBackend.createMaintenance(iterator)?.toPromise();
      } catch (error) {
        console.log(error);
      }
    }
  }
}
