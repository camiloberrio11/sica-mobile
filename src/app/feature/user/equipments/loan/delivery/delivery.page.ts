import { BodyLoanRentedTool } from './../../../../../core/models/RentedTool';
import { WorkerSica } from './../../../../../core/models/Worker';
import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateLoanBody } from 'src/app/core/models/Loan';
import { ToolByBarcodeResponseService } from 'src/app/core/models/Tool';
import { User } from 'src/app/core/models/User';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SicaBackendService } from 'src/app/core/services/sica-backend.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { CategoryTool } from './../../../../../core/models/CategoryTool';
type TypeUserNfc = 'delivery' | 'received';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.page.html',
  styleUrls: ['./delivery.page.scss'],
})
export class DeliveryPage implements OnInit {
  formDelivery: FormGroup;
  indexStep = 0;
  menuFormStep: string[] = ['Equipo', 'Usuario'];
  stepEnd = false;
  toolFindByCodeBar: ToolByBarcodeResponseService;
  categoryToolFind: CategoryTool;
  deliveredByUser: User;
  recivedByUser: WorkerSica;

  constructor(
    private loadingService: LoadingService,
    private sicaApiService: SicaBackendService,
    private toastrService: ToastService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit() {}

  inputChange(event: string, formcontrolname?: string): void {
    this.formDelivery.patchValue({
      [formcontrolname]: event,
    });
    this.cd?.detectChanges();
  }

  currentIndexStepForm(event: number) {
    this.stepEnd = this.indexStep + 1 === this.menuFormStep?.length;
    this.indexStep = event;
  }

  nextStep(): void {
    if (this.stepEnd) {
      // By tool
      if (this.toolFindByCodeBar) {
        this.sendRequest();
        return;
      }

      // By category
      this.sendRequestCategory();
    }
    this.indexStep = this.indexStep + 1;
  }

  async sendRequestCategory(): Promise<void> {
    await this.loadingService.initLoading('Enviando datos... Un momento');
    const valuesForm = this.formDelivery.value;
    const body: BodyLoanRentedTool = {
      deliveredBy: this.deliveredByUser?.id,
      receivedBy: this.recivedByUser?.id,
      quantity: valuesForm.quantity,
      days: valuesForm.days,
      tasks: valuesForm.tasks,
      remark: valuesForm.remark,
      category: this.categoryToolFind?.id,
    };
    this.sicaApiService.sendLoanRentedTool(body).subscribe(
      async (inf) => {
        await this.loadingService.endLoading();
        await this.toastrService.createToast(
          'Se ha entregado con éxito',
          'success'
        );
        this.formDelivery.reset();
        this.router.navigate(['/auth/menu-equipments']);
      },
      async (err) => {
        await this.loadingService.endLoading();
        await this.toastrService.createToast(
          'No se ha podido prestar el equipo',
          'danger'
        );
      }
    );
  }

  getEquipmentByCodeBar(toolByBarcode: ToolByBarcodeResponseService): void {
    this.toolFindByCodeBar = toolByBarcode;
    if (toolByBarcode?.category?.isUnit) {
      this.inputChange('1', 'quantity');
    }
    this.cd?.detectChanges();
  }

  getCategoryByBarcode(category: CategoryTool): void {
    this.categoryToolFind = category;
    if (category?.isUnit) {
      this.inputChange('1', 'quantity');
    }
    this.cd?.detectChanges();
  }

  getUserByToken(user: User, input: TypeUserNfc): void {
    if (input === 'delivery') {
      this.deliveredByUser = user;
      return;
    }
  }

  getWorker(worker: WorkerSica): void {
    this.recivedByUser = worker;
    this.cd?.detectChanges();
  }

  private sendRequest(): void {
    const valuesForm = this.formDelivery.value;
    const body: CreateLoanBody = {
      deliveredBy: this.deliveredByUser?.id,
      receivedBy: this.recivedByUser?.id,
      quantity: valuesForm.quantity,
      days: valuesForm.days,
      tasks: valuesForm.tasks,
      remark: valuesForm.remark,
      tool: this.toolFindByCodeBar?.id,
    };
    this.sicaApiService.createLoan(body).subscribe(
      (data) => {
        this.toastrService.createToast(
          'Se ha entregado el equipo con éxito',
          'success'
        );
        this.formDelivery.reset();
        this.router.navigate(['/auth/menu-equipments']);
      },
      (err) => {
        this.toastrService.createToast(
          'No se ha podido entregar el equipo',
          'warning'
        );
      }
    );
  }

  private buildForm(): void {
    this.formDelivery = new FormGroup({
      codebar: new FormControl('', Validators.required),
      deliveredBy: new FormControl('', Validators.required),
      receivedBy: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      days: new FormControl('', Validators.required),
      tasks: new FormControl('', Validators.required),
      remark: new FormControl('', Validators.required),
    });
  }
}
