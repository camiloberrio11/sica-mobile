import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MaintenanceBodyCreate } from 'src/app/core/models/Maintenance';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SicaBackendService } from 'src/app/core/services/sica-backend.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ToolByBarcodeResponseService } from 'src/app/core/models/Tool';
import { Construction } from 'src/app/core/models/Construction';
import { ConstructionService } from 'src/app/core/services/construction.service';
import { AlertController, Platform } from '@ionic/angular';
import { Location } from '@angular/common';

type MaintenanceType = 'maintenance' | 'reparation';

interface Equipment {
  name: string;
}

@Component({
  selector: 'app-send',
  templateUrl: './send.page.html',
  styleUrls: ['./send.page.scss'],
})
export class SendPage implements OnInit {

  indexStep = 0;
  menuFormStep: string[] = ['Equipo', 'Finalizar'];
  stepEnd = false;
  typeMaintenance: MaintenanceType = 'reparation';
  listSupplier: { id: string; value: string }[] = [];
  listAddedEquipment: MaintenanceBodyCreate[] = [];
  formMaintenance: FormGroup;
  toolRead: ToolByBarcodeResponseService;
  currentConstruction: Construction;
  subscriptionBackButton: Subscription;

  constructor(
    private loadingService: LoadingService,
    private sicaBackend: SicaBackendService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private readonly constructionService: ConstructionService,
    private toastrService: ToastService,
    private platform: Platform,
    private alertController: AlertController,
    private location: Location
  ) {
    this.subscriptionBackButton = this.platform.backButton.subscribe(() => {
      if (this.listAddedEquipment?.length > 0) {
        this.showModal();
      }
    });
  }

  ngOnInit() {
    this.getSupplier();
    this.formBuild();
    this.currentConstruction =
      this.constructionService.getConstructionSelected();
    this.updateFieldForm(this.currentConstruction?.id, 'constructionId');
  }

  ionViewWillEnter() {
    this.formMaintenance.patchValue({
      invoiceDate: new Date().toISOString()?.split('T')[0],
    });
  }

  ionViewDidLeave(): void {
    this.subscriptionBackButton?.unsubscribe();
    this.listAddedEquipment = [];
  }

  async showModal(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Un Momento',
      cssClass: 'modalcss',
      backdropDismiss: false,
      message: `Estas seguro de salir, perderás los equipos agregados`,
      buttons: [
        {
          text: 'Salir',
          handler: () => this.location?.back(),
        },
        { text: 'Cancelar', role: 'cancel', cssClass: 'danger-cancel' },
      ],
    });
    await alert.present();
  }

  currentIndexStepForm(event: number) {
    this.stepEnd = this.indexStep + 1 === this.menuFormStep?.length;
    this.indexStep = event;
  }

  handleSelect(event: string): void {
    this.updateFieldForm(event, 'invoiceSupplierId');
  }

  inputChange(event: string, formcontrolname?: string): void {
    this.updateFieldForm(event, formcontrolname);
  }

  readCodeBar(event: ToolByBarcodeResponseService) {
    this.toolRead = event;
    this.updateFieldForm(event?.id, 'toolId');
    this.cd.detectChanges();
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

  handleDelete(event: number) {
    const update: MaintenanceBodyCreate[] = [];
    for (let index = 0; index < this.listAddedEquipment.length; index++) {
      const element = this.listAddedEquipment[index];
      if (index === event) {
        continue;
      }
      update.push(element);
    }
    this.listAddedEquipment = update;
  }

  async addEquipment(): Promise<void> {
    if (this.formMaintenance?.invalid) {
      await this.toastrService.createToast(
        'Llena los campos obligatorios',
        'warning'
      );
      return;
    }
    const formValues = this.formMaintenance.value;
    const body: MaintenanceBodyCreate = {
      invoice: {
        date: formValues?.invoiceDate,
        number: +formValues?.invoiceNumber,
        supplier: formValues?.invoiceSupplierId,
        price: +formValues?.invoicePrice,
        warranty: +formValues?.invoiceWarranty,
      },
      remark: formValues?.remark,
      construction: formValues?.constructionId,
      tool: formValues?.toolId,
      name: this.toolRead?.brand?.name,
    };
    this.listAddedEquipment.push(body);
    await this.toastrService.createToast('Equipo agregado', 'success');
    this.formMaintenance.reset();
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
    if (this.listAddedEquipment?.length < 1) {
      await this.toastrService.createToast(
        'No has agregado ningún equipo',
        'warning'
      );
      return;
    }
    for (const iterator of this.listAddedEquipment) {
      await this.loadingService.initLoading('Enviando a mantenimiento');
      try {
        await this.sicaBackend.createMaintenance(iterator)?.toPromise();
      } catch (error) {
        console.log(error);
        continue;
      }
    }
    await this.loadingService?.endLoading();
    await this.toastrService.createToast('Equipo enviado', 'success');
    this.listAddedEquipment = [];
    this.router.navigate(['/auth/menu-equipments']);
  }

  private formBuild(): void {
    this.formMaintenance = new FormGroup({
      invoiceDate: new FormControl('', Validators.required),
      invoiceNumber: new FormControl('', Validators.required),
      invoiceSupplierId: new FormControl('', Validators.required),
      invoicePrice: new FormControl('', Validators.required),
      invoiceWarranty: new FormControl('', Validators.required),
      remark: new FormControl(''),
      constructionId: new FormControl('', Validators.required),
      toolId: new FormControl('', Validators.required),
    });
    this.updateFieldForm(
      new Date()?.toISOString()?.split('T')[0],
      'invoiceDate'
    );
  }

  private updateFieldForm(value: string, formcontrol: string): void {
    this.formMaintenance.patchValue({
      [formcontrol]: value,
    });
  }

}
