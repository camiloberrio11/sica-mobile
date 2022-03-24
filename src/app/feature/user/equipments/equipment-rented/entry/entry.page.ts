import { StringTransformService } from './../../../../../core/services/string-transform.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastService } from './../../../../../core/services/toast.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SaveRentedToolBody } from 'src/app/core/models/RentedTool';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SicaBackendService } from 'src/app/core/services/sica-backend.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryTool } from 'src/app/core/models/CategoryTool';
import { AlertController, Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { SendNotificationEmail } from 'src/app/core/models/SendEmailNotification';
import { GeneratePdfService } from 'src/app/core/services/generate-pdf.service';
import { SendNotificationEmailService } from 'src/app/core/services/send-notification-email.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.page.html',
  styleUrls: ['./entry.page.scss'],
})
export class EntryPage implements OnInit {
  listSupplier: { id: string; value: string }[] = [];
  listAddedEquipments: SaveRentedToolBody[] = [];
  formEntry: FormGroup;
  subscriptionBackButton: Subscription;
  currentCategory: CategoryTool;

  constructor(
    private loadingService: LoadingService,
    private platform: Platform,
    private alertController: AlertController,
    private location: Location,
    private sicaBackend: SicaBackendService,
    private cd: ChangeDetectorRef,
    private toastrService: ToastService,
    private router: Router,
    private readonly stringTransformService: StringTransformService,
    private readonly pdfGeneratorService: GeneratePdfService,
    private readonly sendNotificationEmailService: SendNotificationEmailService
  ) {
    this.subscriptionBackButton = this.platform.backButton.subscribe(() => {
      if (this.listAddedEquipments?.length > 0) {
        this.showModal();
      }
    });
  }

  ngOnInit(): void {
    this.buildForm();
  }

  ionViewDidLeave(): void {
    this.subscriptionBackButton?.unsubscribe();
    this.listAddedEquipments = [];
  }

  async showModal(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Un momento',
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

  ionViewDidEnter(): void {
    this.listAddedEquipments = [];
    this.getSupplier();
  }

  async deleteItem(event: number): Promise<void> {
    const deleteFormat: SaveRentedToolBody[] = [];
    for (let index = 0; index < this.listAddedEquipments.length; index++) {
      if (event === index) {
        continue;
      }
      deleteFormat.push(this.listAddedEquipments[index]);
    }
    this.listAddedEquipments = deleteFormat;
    await this.toastrService.createToast('Eliminado', 'success');
  }

  async save(): Promise<void> {
    if (this.listAddedEquipments?.length < 1) {
      this.toastrService.createToast(
        'No hay equipos previamente agregados',
        'secondary'
      );
      return;
    }
    try {
      await this.loadingService.initLoading('Guardando...');
      for (const equipment of this.listAddedEquipments) {
        await this.sicaBackend.createRentedTool(equipment).toPromise();
      }
      this.listAddedEquipments = [];
      await this.loadingService.endLoading();
      await this.toastrService.createToast(
        'Se han creado con éxito',
        'success'
      );
      this.router.navigate(['/auth/menu-equipments']);
    } catch (error) {
      await this.loadingService.endLoading();
      this.toastrService.createToast('Ocurrió un error guardando', 'danger');
    }
  }

  async sendEmail(): Promise<void> {
    const alert = await this.alertController.create({
      cssClass: 'modalcss',
      header: 'Un momento',
      message:
        'Ingresa correo(s) a notificar. Si son mas de uno separalos por coma (,)',
      mode: 'ios',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Ej: micorreo@gmail.com, app@gmail.com',
          attributes: {
            required: true,
          },
        },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel', cssClass: 'danger-cancel' },
        {
          text: 'Enviar',
          handler: () => {
            console.log('Confirm Ok');
          },
        },
      ],
    });
    await alert.present();
    const { data } = await alert.onWillDismiss();
    if (data?.values?.email) {
      this.sendEmailNotification(data?.values?.email);
      return;
    }
    await this.toastrService.createToast(
      'Debes ingresar correo válido',
      'warning',
      'middle'
    );
  }

  async sendEmailNotification(email: string): Promise<void> {
    await this.loadingService.initLoading(
      'Enviando correo y creando adjuntos...'
    );
    const contentPdf = await this.pdfGeneratorService.generatePdf(
      '<html> <h1>  Hello World  </h1> </html>'
    );
    const emailSend =
      await this.sendNotificationEmailService.sendEmailNotification(
        email,
        [{ name: 'CertificadoEquipoAlquiladoIngreso.pdf', data: contentPdf }],
        'Movimiento de equipo alquilado',
        'Has creado un ingreso de equipo alquilado, a continuación encontrarás más información asociada al movimiento'
      );
    if (emailSend) {
      await this.loadingService.endLoading();
      await this.toastrService.createToast('Correo enviado', 'success');
      return;
    }
    await this.loadingService.endLoading();
    await this.toastrService.createToast(
      'Ha ocurrido un error con el servidor de correos',
      'danger'
    );
  }

  async handleAdd(): Promise<void> {
    if (this.formEntry?.invalid) {
      await this.toastrService.createToast(
        'Completa campos obligatorios',
        'warning'
      );
      return;
    }
    const formValue = this.formEntry.value;
    const newEquipment: SaveRentedToolBody = {
      remission: {
        number: +formValue?.remisionNumber,
        dailyPrice: +this.stringTransformService.removeSpecialCharacters(
          `${formValue?.remisionDailyPrice}`
        ),
        rentedFrom: formValue?.remisionRentedFrom,
        estimatedRentalDays: +formValue?.remisionEstimatedRentalDays,
        supplier: formValue?.remisionSupplierId,
      },
      tool: {
        idBySupplier: formValue?.toolIdBySupplier,
        quantity: +formValue?.toolQuantity,
        usedFor: 'herramientas necesarias para terminar obra',
        image:
          'https://d25rq8gxcq0p71.cloudfront.net/dictionary-images/324/5ce52792-a3d5-410e-9586-c29f21c48344.jpg',
        category: formValue?.toolCategory,
      },
    };
    this.listAddedEquipments.push(newEquipment);
    this.toastrService.createToast('Agregado!', 'success');
    this.formEntry.reset();
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

  updateField(value: string, formcontrol: string): void {
    this.formEntry.patchValue({
      [formcontrol]: value,
    });
  }

  handleCategory(event: CategoryTool): void {
    this.updateField(event?.id, 'toolCategory');
    this.currentCategory = event;
    if (this.currentCategory?.isUnit) {
      this.formEntry.get('toolIdBySupplier').setValidators([Validators.required])

    }
    this.cd.detectChanges();
  }

  private buildForm(): void {
    this.formEntry = new FormGroup({
      remisionNumber: new FormControl('', Validators.required),
      remisionDailyPrice: new FormControl('', Validators.required),
      remisionRentedFrom: new FormControl('', Validators.required),
      remisionEstimatedRentalDays: new FormControl('', Validators.required),
      remisionSupplierId: new FormControl('', Validators.required),
      toolIdBySupplier: new FormControl(''),
      toolQuantity: new FormControl('', Validators.required),
      toolUserFor: new FormControl(''),
      toolImage: new FormControl(''),
      toolCategory: new FormControl('', Validators.required),
    });
    this.updateField(
      new Date()?.toISOString()?.split('T')[0],
      'remisionRentedFrom'
    );
  }
}
