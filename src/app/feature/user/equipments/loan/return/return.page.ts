import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ToolByBarcodeResponseService } from 'src/app/core/models/Tool';
import { User } from 'src/app/core/models/User';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SicaBackendService } from 'src/app/core/services/sica-backend.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-return',
  templateUrl: './return.page.html',
  styleUrls: ['./return.page.scss'],
})
export class ReturnPage implements OnInit {
  indexStep = 0;
  menuFormStep: string[] = ['Equipo', 'Usuario'];
  stepEnd = false;
  toolFindByCodeBar: ToolByBarcodeResponseService;
  formReturn: FormGroup;
  deliveredByUser: User;
  recivedByUser: User;
  statusEquipment = true;

  constructor(
    private loadingService: LoadingService,
    private sicaApiService: SicaBackendService,
    private toastrService: ToastService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  currentIndexStepForm(event: number) {
    this.stepEnd = this.indexStep + 1 === this.menuFormStep?.length;
    this.indexStep = event;
  }

  inputChange(event: string, formcontrolname?: string): void {
    this.formReturn.patchValue({
      [formcontrolname]: event,
    });
  }

  changeCheckbox(event: string) {
    this.statusEquipment = event === 'return-good';
  }

  getEquipmentByCodeBar(codebar: string): void {
    this.sicaApiService.getToolByCodeBar(codebar).subscribe(
      (data) => {
        this.loadingService.endLoading();
        this.toolFindByCodeBar = data;
      },
      (err) => {
        this.loadingService.endLoading();
        this.toastrService.createToast(
          'No se ha encontrado datos del equipo',
          'warning'
        );
        console.error(err);
      }
    );
  }

  nextStep(): void {
    if (this.stepEnd) {
      // this.sendRequest();
      return;
    }
    this.indexStep = this.indexStep + 1;
  }

  getUserByToken(token: string): void {
    console.log(token);
    this.sicaApiService.getUserByToken(token).subscribe(
      (data) => {
        // debugger;
        //   this.deliveredByUser = data;
        //   this.recivedByUser = data;
      },
      (err) => {
        this.toastrService.createToast(
          'No se ha encontrado información',
          'warning'
        );
      }
    );
  }

  private buildForm(): void {
    this.formReturn = new FormGroup({
      codebar: new FormControl('', Validators.required),
    });
  }
}
