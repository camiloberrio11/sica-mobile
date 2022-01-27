import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CategoryTool } from 'src/app/core/models/CategoryTool';
import { RentedTool } from 'src/app/core/models/RentedTool';
import {
  BodyTakeBackRentedTool,
  IdToolBodyTakeBackRentedTool,
  ToolByBarcodeResponseService,
} from 'src/app/core/models/Tool';
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
  listAddedEquipments: IdToolBodyTakeBackRentedTool[] = [];
  subscriptionBackButton: Subscription;
  currentDate: string;
  listSupplier: { id: string; value: string }[] = [];
  lastMovementCategory: RentedTool;

  // Properties view
  available = 0;
  categoryTool: CategoryTool;
  idCustomer: string;
  quantity: string;
  remision: string;
  userNfc: User;

  constructor(
    private loadingService: LoadingService,
    private sicaBackend: SicaBackendService,
    private platform: Platform,
    private alertController: AlertController,
    private location: Location,
    private toastrService: ToastService,
    private router: Router
  ) {
    this.subscriptionBackButton = this.platform.backButton.subscribe(() => {
      if (this.listAddedEquipments?.length > 0) {
        this.showModal();
      }
    });
  }

  ionViewDidLeave(): void {
    this.available = 0;
    this.subscriptionBackButton?.unsubscribe();
    this.listAddedEquipments = [];
    const [year, month, day] = new Date()
      ?.toDateString()
      ?.split('T')[0]
      ?.split('-');
    this.currentDate = `${day}${month}${year}`;
  }

  ionViewDidEnter() {
    this.getSupplier();
    this.available = 0;
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

  async addEquipment(): Promise<void> {
    this.listAddedEquipments.push({
      returnIdBySupplier: 'string',
      quantity: +this.quantity,
      category: this.categoryTool?.id,
    });
    await this.toastrService.createToast('Equipo agregado', 'success');
    this.quantity = null;
  }

  save(): void {
    alert('Guardado');
  }

  sendEmail(): void {
    alert('Correo enviado');
  }

  handleInpput(value: string) {
    this.quantity = value;
  }

  handleNfc(nfcValue: User) {
    this.userNfc = nfcValue;
  }

  async handleCodebar(event: CategoryTool) {
    this.categoryTool = event;
    if (event?.isUnit) {
      this.quantity = '1';
    }
    await this.loadingService.initLoading(
      'Obteniendo ultimo movimiento de la categoría'
    );
    this.sicaBackend.getLastLoanRentedTool(event?.id).subscribe(
      async (data) => {
        this.lastMovementCategory = data;
        await this.loadingService.endLoading();
        this.getAvailable();
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

  selectCustomer(event: string) {
    this.idCustomer = event;
    this.getAvailable();
  }

  async getAvailable(): Promise<void> {
    if (!this.idCustomer || !this.categoryTool) {
      return;
    }
    await this.loadingService?.initLoading('Obteniendo cantidad disposible');
    this.sicaBackend
      .getAvailableRentedTool(this.idCustomer, this.categoryTool?.id)
      .subscribe(
        async (inf) => {
          this.available = inf?.available;
          await this.loadingService?.endLoading();
        },
        async (err) => {
          await this.loadingService?.endLoading();
          await this.toastrService.createToast(
            'Ha ocurrido un error obteniendo cantidad disponible',
            'danger'
          );
        }
      );
  }

  async sendBackTool(): Promise<void> {
    const date = new Date()?.toISOString().split('T')[0];
    const body: BodyTakeBackRentedTool = {
      ids: this.listAddedEquipments,
      remission: this.remision,
      remark: '',
      deliveredBy: this.userNfc?.id,
      realAnnouncedDate: date,
      supplier: this.idCustomer,
    };
    await this.loadingService.initLoading('Enviando equipos');
    this.sicaBackend.takeBackRentedTool(body).subscribe(
      async () => {
        await this.loadingService?.endLoading();
        await this.toastrService.createToast('Equipos enviados', 'success');
        this.router.navigate(['/auth/menu-equipments']);
      },
      async (err) => {
        await this.loadingService?.endLoading();
        await this.toastrService.createToast(
          'Ha ocurrido un error enviando equipos',
          'danger'
        );
      }
    );
  }
}
