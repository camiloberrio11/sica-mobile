import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToolByBarcodeResponseService } from 'src/app/core/models/Tool';
import { ToastService } from 'src/app/core/services/toast.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SicaBackendService } from 'src/app/core/services/sica-backend.service';
import {
  BodyReturnMaintenance,
  Maintenance,
} from 'src/app/core/models/Maintenance';

@Component({
  selector: 'app-return',
  templateUrl: './return.page.html',
  styleUrls: ['./return.page.scss'],
})
export class ReturnPage implements OnInit {
  menuFormStep: string[] = ['Equipo'];
  indexStep = 0;
  stepEnd = true;
  formMaintenance: FormGroup;
  toolRead: ToolByBarcodeResponseService;
  lastMaintenance: Maintenance;

  constructor(
    private cd: ChangeDetectorRef,
    private toastrService: ToastService,
    private sicaBackend: SicaBackendService,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.formBuild();
  }

  currentIndexStepForm(event: number) {
    this.stepEnd = this.indexStep + 1 === this.menuFormStep?.length;
    this.indexStep = event;
  }

  readCodeBar(event: ToolByBarcodeResponseService) {
    this.toolRead = event;
    this.updateFieldForm(event?.id, 'toolId');
    this.cd.detectChanges();

    // Obtener el ultimo mantenimiento del equipo
    this.getLastMovementTool(event?.id);
  }

  inputChange(event: string, formcontrolname?: string): void {
    this.updateFieldForm(event, formcontrolname);
  }

  sendEmail(): void {
    alert('Email enviado');
  }

  nextStep(): void {
    this.sendRequest();
  }

  private updateFieldForm(value: string, formcontrol: string): void {
    this.formMaintenance.patchValue({
      [formcontrol]: value,
    });
  }

  private formBuild(): void {
    this.formMaintenance = new FormGroup({
      remark: new FormControl('', Validators.required),
    });
  }

  private async getLastMovementTool(toolId: string): Promise<void> {
    await this.loadingService.initLoading(
      'Obteniendo ultimo movimiento de la herramienta'
    );
    this.sicaBackend.getMaintenance(toolId).subscribe(
      async (info) => {
        await this.loadingService?.endLoading();
        this.lastMaintenance = info;
      },
      async (err) => {
        await this.loadingService?.endLoading();
        await this.toastrService.createToast(
          'No se ha encontrado movimiento del equipo',
          'danger'
        );
      }
    );
  }

  private async sendRequest(): Promise<void> {
    if (this.formMaintenance.invalid) {
      await this.toastrService.createToast(
        'Completa campos obligatorios',
        'warning'
      );
      return;
    }
    await this.loadingService.initLoading('Recibiendo de mantenimiento');
    const body: BodyReturnMaintenance = {
      return: { remark: this.formMaintenance?.get('remark')?.value },
    };
    this.sicaBackend.patchMaintenance(this.lastMaintenance?.id, body).subscribe(
      async () => {
        await this.loadingService?.endLoading();
        await this.toastrService.createToast('Equipo recibido', 'success');
        this.formMaintenance.reset();
        this.router.navigate(['/auth/menu-equipments']);
      },
      async (err) => {
        await this.toastrService.createToast('Ha ocurrido un error', 'danger');
        await this.loadingService?.endLoading();
      }
    );
  }
}
