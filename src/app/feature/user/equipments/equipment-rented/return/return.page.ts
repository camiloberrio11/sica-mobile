import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CategoryTool } from 'src/app/core/models/CategoryTool';
import { RentedTool } from 'src/app/core/models/RentedTool';
import { ToolByBarcodeResponseService } from 'src/app/core/models/Tool';
import { User } from 'src/app/core/models/User';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SicaBackendService } from 'src/app/core/services/sica-backend.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { AlertController, Platform } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-return',
  templateUrl: './return.page.html',
  styleUrls: ['./return.page.scss'],
})
export class ReturnPage {
  listAddedEquipments: { name: string }[] = [];
  subscriptionBackButton: Subscription;

  listSupplier: { id: string; value: string }[] = [];
  lastMovementCategory: RentedTool;
  constructor(
    private loadingService: LoadingService,
    private sicaBackend: SicaBackendService,
    private platform: Platform,
    private alertController: AlertController,
    private location: Location,
    private toastrService: ToastService
  ) {
    this.subscriptionBackButton = this.platform.backButton.subscribe(() => {
      if(this.listAddedEquipments?.length > 0) {
        this.showModal();
      }
    });
  }

  ionViewDidLeave(): void {
    this.subscriptionBackButton?.unsubscribe();
    this.listAddedEquipments = [];
  }

  ionViewDidEnter() {
    this.getSupplier();
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

  handleInpput(value: string) {
    console.log(value);
  }

  handleNfc(nfcValue: User) {
    console.log(nfcValue);
  }

  async handleCodebar(event: CategoryTool) {
    await this.loadingService.initLoading(
      'Obteniendo ultimo movimiento de la categoría'
    );
    this.sicaBackend.getLastLoanRentedTool(event?.id).subscribe(
      async (data) => {
        this.lastMovementCategory = data;
        await this.loadingService.endLoading();
      },
      async (err) => {
        this.lastMovementCategory = null;
        await this.loadingService.endLoading();
      }
    );
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
