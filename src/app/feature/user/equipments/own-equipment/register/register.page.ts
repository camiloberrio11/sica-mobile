import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SicaBackendService } from 'src/app/core/services/sica-backend.service';
import { CreateToolBody } from 'src/app/core/models/Tool';
import { StorageService } from 'src/app/core/services/storage.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  indexStep = 0;
  menuFormStep: string[] = ['Foto', 'Datos', 'Factura'];
  stepEnd = false;
  formRegister: FormGroup;
  base64ImageEquipment: string;
  listSupplier: { id: string; value: string }[] = [];
  listBrand: { id: string; value: string }[] = [];
  listCategoryTool: { id: string; value: string }[] = [];

  constructor(
    private loadingService: LoadingService,
    private sicaBackend: SicaBackendService,
    private cd: ChangeDetectorRef,
    private toastrService: ToastService,
    private router: Router,
    private readonly storageService: StorageService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  ionViewDidEnter(): void {
    this.getSupplier();
    this.base64ImageEquipment = null;
  }

  currentIndexStepForm(event: number) {
    this.stepEnd = this.indexStep + 1 === this.menuFormStep?.length;
    this.indexStep = event;
  }

  nextStep(): void {
    if (this.stepEnd) {
      this.sendRequest();
      return;
    }
    this.indexStep = this.indexStep + 1;
  }

  getEquipmentByCodeBar(toolByBarcode: string): void {
    this.updateFieldForm(toolByBarcode, 'toolCodebar');
    this.cd?.detectChanges();
  }

  handleSelect(event: string | any, formcontrol: string): void {
    this.updateFieldForm(event, formcontrol);
  }

  getDataTakePhoto(photoBase64: string): void {
    this.base64ImageEquipment = photoBase64;
  }

  private async getBrand(): Promise<void> {
    await this.loadingService.initLoading('Obteniendo marcas');
    this.sicaBackend.getBrand().subscribe(
      async (sup) => {
        this.listBrand = sup.map((it) => {
          const item = {
            id: it.id,
            value: it.name,
          };
          return item;
        });
        await this.loadingService.endLoading();
        this.getCategoryTool();
      },
      async (err) => {
        this.listBrand = [];
        await this.loadingService.endLoading();
      }
    );
  }

  private async getSupplier(): Promise<void> {
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
        this.getBrand();
      },
      async (err) => {
        this.listSupplier = [];
        await this.loadingService.endLoading();
      }
    );
  }

  private async getCategoryTool(): Promise<void> {
    await this.loadingService.initLoading('Obteniendo categorías');
    this.sicaBackend.getCategoryTool().subscribe(
      async (sup) => {
        this.listCategoryTool = sup.map((it) => {
          const item = {
            id: it.id,
            value: it.name,
          };
          return item;
        });
        await this.loadingService.endLoading();
      },
      async (err) => {
        this.listCategoryTool = [];
        await this.loadingService.endLoading();
      }
    );
  }

  private buildForm(): void {
    this.formRegister = new FormGroup({
      toolCodebar: new FormControl('', Validators.required),
      toolImage: new FormControl('', Validators.required),
      toolReference: new FormControl('', Validators.required),
      toolSerial: new FormControl('', Validators.required),
      toolCategoryId: new FormControl('', Validators.required),
      toolBrandId: new FormControl('', Validators.required),
      toolProfileId: new FormControl('', Validators.required),
      invoiceDate: new FormControl('', Validators.required),
      invoiceNumber: new FormControl(''),
      invoiceSupplierId: new FormControl('', Validators.required),
      invoicePrice: new FormControl('', Validators.required),
      invoiceWarranty: new FormControl(''),
    });
  }

  private updateFieldForm(value: string, formcontrol: string): void {
    this.formRegister.patchValue({
      [formcontrol]: value,
    });
  }

  private async sendRequest(): Promise<void> {
    await this.loadingService.initLoading('Guardando. Un momento por favor');
    const valuesForm = this.formRegister.value;
    const urlImage = await this.upploadImage();
    const body: CreateToolBody = {
      invoice: {
        date: valuesForm?.invoiceDate || new Date()?.toISOString() ,
        number: +valuesForm?.invoiceNumber,
        supplier: valuesForm?.invoiceSupplierId,
        price: +valuesForm?.invoicePrice,
        warranty: +valuesForm?.invoiceWarranty,
      },
      tool: {
        image: urlImage || '',
        barcode: valuesForm?.toolCodebar,
        reference: valuesForm?.toolReference,
        serial: valuesForm?.toolSerial,
        category: valuesForm?.toolCategoryId,
        brand: valuesForm?.toolBrandId,
        profile: '618a2aca387cfbfae61205fe',
      },
    };
    this.sicaBackend.createTool(body).subscribe(
      async (data) => {
        await this.loadingService.endLoading();
        await this.toastrService.createToast(
          'Se ha creado el equipo con éxito',
          'success'
        );
        this.formRegister.reset();
        this.router.navigate(['/auth/menu-equipments']);
      },
      async (err) => {
        await this.loadingService.endLoading();
        await this.toastrService.createToast(
          `No se ha podido crear el equipo ${err?.msg}`,
          'warning'
        );
      }
    );
  }

  private async upploadImage(): Promise<string> {
    const valuesForm = this.formRegister.value;
    const path = `${environment?.nameApp}/equipo-propio/registro/${valuesForm?.toolCodebar}_${valuesForm?.toolReference}`;
    try {
      const url = await this.storageService.uploadImageFirebase(
        path,
        this.base64ImageEquipment
      );
      return url;
    } catch (error) {
      return JSON.stringify(error);
    }
  }
}
