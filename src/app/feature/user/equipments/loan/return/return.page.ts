import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ToolByBarcodeResponseService } from 'src/app/core/models/Tool';
import { User } from 'src/app/core/models/User';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SicaBackendService } from 'src/app/core/services/sica-backend.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { UpdateLoanBody } from 'src/app/core/models/Loan';
type TypeUserNfc = 'delivery' | 'received';
type InputForm = 'remark' | 'quantity';

@Component({
  selector: 'app-return',
  templateUrl: './return.page.html',
  styleUrls: ['./return.page.scss'],
})
export class ReturnPage {
  indexStep = 0;
  menuFormStep: string[] = ['Equipo', 'Usuario'];
  stepEnd = false;
  toolFindByCodeBar: ToolByBarcodeResponseService;
  deliveredByUser: User;
  recivedByUser: User;
  statusEquipment = true;

  // Properties form
  quantity = 0;
  remark: string;

  constructor(
    private loadingService: LoadingService,
    private sicaApiService: SicaBackendService,
    private toastrService: ToastService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {}

  currentIndexStepForm(event: number) {
    this.stepEnd = this.indexStep + 1 === this.menuFormStep?.length;
    this.indexStep = event;
  }


  changeCheckbox(event: string) {
    this.statusEquipment = event === 'return-good';
  }

  getEquipmentByCodeBar(toolByBarcode: ToolByBarcodeResponseService): void {
    this.toolFindByCodeBar = toolByBarcode;
    this.cd?.detectChanges();
  }

  nextStep(): void {
    if (this.stepEnd) {
      this.sendRequest();
      return;
    }
    this.indexStep = this.indexStep + 1;
  }

  inputChange(event: string, input: InputForm): void {
    if (input === 'quantity') {
      this.quantity = +event;
      return;
    }
    this.remark = event;

  }

  getUserByToken(userNfc: User, input: TypeUserNfc): void {
    if (input === 'delivery') {
      this.deliveredByUser = userNfc;
      return;
    }
    this.recivedByUser = userNfc;
  }

  private sendRequest(): void {
    const body: UpdateLoanBody = {
      return: {
        deliveredBy: this.deliveredByUser?.id,
        receivedBy: this.recivedByUser?.id,
        detail: {
          status: this.statusEquipment ? 'bueno': 'malo',
          quantity: this.quantity,
        },
        remark: this.remark,
      },
    };

    this.sicaApiService.updateLoan(body, '6195b55cb3ab015475ec826d').subscribe(
      (data) => {
        this.toastrService.createToast(
          'Se ha recibido el equipo con éxito',
          'success'
        );
        this.remark = '';
        this.quantity = 0;
        // this.formDelivery.reset();
        this.router.navigate(['/auth/menu-equipments']);
      },
      (err) => {
        this.toastrService.createToast(
          'No se ha podido recibir el equipo',
          'warning'
        );
      }
    );
  }
}
