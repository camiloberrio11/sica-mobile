import { Router } from '@angular/router';
import { Movement, ReceiveToolBody } from './../../../../../../core/models/Movement';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToolByBarcodeResponseService } from 'src/app/core/models/Tool';
import { ToastService } from 'src/app/core/services/toast.service';
import { SicaBackendService } from 'src/app/core/services/sica-backend.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { User } from 'src/app/core/models/User';
import { Construction } from 'src/app/core/models/Construction';
import { ConstructionService } from 'src/app/core/services/construction.service';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.page.html',
  styleUrls: ['./reception.page.scss'],
})
export class ReceptionPage implements OnInit {
  indexStep = 0;
  menuFormStep: string[] = ['Equipo', 'Destino'];
  stepEnd = false;
  toolFindByCodeBar: ToolByBarcodeResponseService;
  userNfc: User;
  lastMovement: Movement;
  // currentConstruction: Construction;

  constructor(
    private cd: ChangeDetectorRef,
    private loadingService: LoadingService,
    private sicaApiService: SicaBackendService,
    private toastrService: ToastService,
    private readonly constructionService: ConstructionService,
    private router: Router
  ) {}

  ngOnInit() {}

  // ionViewDidEnter(): void {
  //   this.currentConstruction =
  //     this.constructionService?.getConstructionSelected();
  // }

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
    this.getEndMovementByEquipment(toolByBarcode?.id);
  }

  async getEndMovementByEquipment(idTool: string): Promise<void> {
    await this.loadingService.initLoading(
      'Obteniendo ultimo movimiento del equipo leído'
    );
    this.sicaApiService.getLastMovement(idTool).subscribe(
      async (data) => {
        this.lastMovement = data;
        await this.loadingService.endLoading();
      },
      async (err) => {
        await this.loadingService.endLoading();

      }
    );
  }

  currentIndexStepForm(event: number) {
    this.stepEnd = this.indexStep + 1 === this.menuFormStep?.length;
    this.indexStep = event;
  }

  handleUserNfc(event: User): void {
    this.userNfc = event;
  }
  private async sendRequest(): Promise<void> {
    await this.loadingService.initLoading('Recibiendo equipo');
    const body: ReceiveToolBody = {
      destination: {
        user: this.userNfc.id,
      },
    };
    this.sicaApiService.receiveTool(body, this.lastMovement?.id).subscribe(
      async (data) => {
        await this.loadingService.endLoading();
        await this.toastrService.createToast(
          'Se ha entregado el equipo con éxito',
          'success'
        );
        this.router.navigate(['/auth/menu-equipments']);
      },
      async (err) => {
        await this.loadingService.endLoading();
        this.toastrService.createToast(
          'No se ha podido entregar el equipo',
          'warning'
        );
      }
    );
  }
}
