import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateLoanBody } from 'src/app/core/models/Loan';
import { ToolByBarcodeResponseService } from 'src/app/core/models/Tool';
import { User } from 'src/app/core/models/User';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SicaBackendService } from 'src/app/core/services/sica-backend.service';
import { ToastService } from 'src/app/core/services/toast.service';

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
  deliveredByUser: User;
  recivedByUser: User;

  constructor(
    private loadingService: LoadingService,
    private sicaApiService: SicaBackendService,
    private toastrService: ToastService,
    private cd: ChangeDetectorRef
  ) {
    this.buildForm();
  }

  ngOnInit() {}

  inputChange(event: string, formcontrolname?: string): void {
    this.formDelivery.patchValue({
      [formcontrolname]: event,
    });
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

  getEquipmentByCodeBar(toolByBarcode: ToolByBarcodeResponseService): void {
    this.toolFindByCodeBar = toolByBarcode;
    this.cd?.detectChanges();
  }

  getUserByToken(user: User, input: string): void {
    console.log(`${input}-${JSON.stringify(user)}`);
  }



  private sendRequest(): void {
    console.log('soy form', this.formDelivery.value);
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
        this.formDelivery.reset();
        this.toastrService.createToast(
          'Se ha entregado el equipo con ??xito',
          'success'
        );
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
