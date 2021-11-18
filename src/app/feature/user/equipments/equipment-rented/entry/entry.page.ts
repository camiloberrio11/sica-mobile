import { ToastService } from './../../../../../core/services/toast.service';
import { Component, OnInit } from '@angular/core';
import { SaveRentedToolBody } from 'src/app/core/models/RentedTool';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SicaBackendService } from 'src/app/core/services/sica-backend.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryTool } from 'src/app/core/models/CategoryTool';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.page.html',
  styleUrls: ['./entry.page.scss'],
})
export class EntryPage implements OnInit {
  listSupplier: { id: string; value: string }[] = [];
  listAddedEquipments: SaveRentedToolBody[] = [];
  formEntry: FormGroup;

  constructor(
    private loadingService: LoadingService,
    private sicaBackend: SicaBackendService,
    private toastrService: ToastService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  ionViewDidEnter(): void {
    this.listAddedEquipments = [];
    this.getSupplier();
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
    } catch (error) {
      this.toastrService.createToast('Ocurrió un error guardando', 'danger');
    }
  }

  sendEmail(): void {
    alert('Enviado al correo');
  }

  handleAdd(): void {
    if (this.formEntry?.invalid) {
      this.toastrService.createToast('Completa el formulario', 'medium');
      return;
    }
    const formValue = this.formEntry.value;
    const newEquipment: SaveRentedToolBody = {
      remission: {
        number: +formValue?.remisionNumber,
        dailyPrice: +formValue?.remisionDailyPrice,
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
        this.toastrService.createToast(
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
  }

  private buildForm(): void {
    this.formEntry = new FormGroup({
      remisionNumber: new FormControl('', Validators.required),
      remisionDailyPrice: new FormControl('', Validators.required),
      remisionRentedFrom: new FormControl('', Validators.required),
      remisionEstimatedRentalDays: new FormControl('', Validators.required),
      remisionSupplierId: new FormControl('', Validators.required),
      toolIdBySupplier: new FormControl('', Validators.required),
      toolQuantity: new FormControl('', Validators.required),
      toolUserFor: new FormControl('', Validators.required),
      toolImage: new FormControl('', Validators.required),
      toolCategory: new FormControl('', Validators.required),
    });
  }
}
