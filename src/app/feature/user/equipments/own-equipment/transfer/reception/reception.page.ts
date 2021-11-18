import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToolByBarcodeResponseService } from 'src/app/core/models/Tool';
import { ToastService } from 'src/app/core/services/toast.service';
import { SicaBackendService } from 'src/app/core/services/sica-backend.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { User } from 'src/app/core/models/User';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.page.html',
  styleUrls: ['./reception.page.scss'],
})
export class ReceptionPage implements OnInit {
  indexStep = 0;
  menuFormStep: string[] = ['Equipo', 'Destino'];
  stepEnd = false;
  formReception: FormGroup;
  toolFindByCodeBar: ToolByBarcodeResponseService;
  userNfc: User;

  constructor(
    private cd: ChangeDetectorRef,
    private loadingService: LoadingService,
    private sicaApiService: SicaBackendService,
    private toastrService: ToastService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  nextStep(): void {
    if (this.stepEnd) {
      // this.sendRequest();
      return;
    }
    this.indexStep = this.indexStep + 1;
  }

  getEquipmentByCodeBar(toolByBarcode: ToolByBarcodeResponseService): void {
    this.toolFindByCodeBar = toolByBarcode;
    this.cd?.detectChanges();
  }

  currentIndexStepForm(event: number) {
    this.stepEnd = this.indexStep + 1 === this.menuFormStep?.length;
    this.indexStep = event;
  }

  handleUserNfc(event: User): void {
    this.userNfc = event;
  }

  updateForm(value: string, formcontrolname?: string): void {
    this.formReception.patchValue({
      [formcontrolname]: value,
    });
  }

  private buildForm(): void {
    this.formReception = new FormGroup({
      codebar: new FormControl('', Validators.required),
    });
  }
}
