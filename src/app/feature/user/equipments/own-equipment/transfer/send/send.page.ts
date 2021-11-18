import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SendEToolBody } from 'src/app/core/models/Movement';
import { ToolByBarcodeResponseService } from 'src/app/core/models/Tool';
import { User } from 'src/app/core/models/User';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SicaBackendService } from 'src/app/core/services/sica-backend.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ConstructionService } from 'src/app/core/services/construction.service';
type TypeSelect = 'construction' | 'reason';
interface FormSimulate {
  userId: string;
  constructionId: string;
  reasonId: string;
  dateReturn: string;
}

@Component({
  selector: 'app-send',
  templateUrl: './send.page.html',
  styleUrls: ['./send.page.scss'],
})
export class SendPage implements OnInit {
  indexStep = 0;
  menuFormStep: string[] = ['Equipo', 'Destino'];
  stepEnd = false;
  toolFindByCodeBar: ToolByBarcodeResponseService;
  listReason: { id: string; value: string }[] = [];
  listConstruction: { id: string; value: string }[] = [];
  formState: FormSimulate;
  idConstructionCurrent: string;

  constructor(
    private loadingService: LoadingService,
    private sicaApiService: SicaBackendService,
    private toastrService: ToastService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private constructionService: ConstructionService
  ) {}

  ngOnInit() {
    this.getReasons();
  }

  ionViewWillEnter() {
    this.idConstructionCurrent = this.constructionService?.getConstructionSelected()?.id;
  }

  nextStep(): void {
    if (this.stepEnd) {
      this.sendRequest();
      return;
    }
    this.indexStep = this.indexStep + 1;
  }

  currentIndexStepForm(event: number) {
    this.stepEnd = this.indexStep + 1 === this.menuFormStep?.length;
    this.indexStep = event;
  }

  handleUserNfc(user: User) {
    this.updateForm('userId', user?.id);
  }

  handleInput(event: string) {
    this.updateForm('dateReturn', event);
  }

  handleSelect(event: string, typeSelect: TypeSelect): void {
    if (typeSelect === 'construction') {
      this.updateForm('constructionId', event);
      return;
    }
    this.updateForm('reasonId', event);
  }

  getEquipmentByCodeBar(toolByBarcode: ToolByBarcodeResponseService): void {
    this.toolFindByCodeBar = toolByBarcode;
    this.cd?.detectChanges();
  }

  async getReasons(): Promise<void> {
    await this.loadingService.initLoading('Obteniendo motivos');
    this.sicaApiService.getReason().subscribe(
      async (data) => {
        this.listReason = data.map((it) => {
          const item = {
            id: it.id,
            value: it.description,
          };
          return item;
        });

        await this.loadingService.endLoading();
        this.getConstructions();
      },
      async (err) => {
        this.listReason = [];
        this.toastrService.createToast(
          'Ocurrió un error obteniendo motivos',
          'warning'
        );
        await this.loadingService.endLoading();
      }
    );
  }

  async getConstructions(): Promise<void> {
    await this.loadingService.initLoading('Obteniendo obras');
    this.sicaApiService.getConstruiction().subscribe(
      async (data) => {
        this.listConstruction = data.map((it) => {
          const item = {
            id: it?.id,
            value: it?.name,
          };
          return item;
        });
        this.listConstruction = this.listConstruction.filter(it => it?.id !== this.idConstructionCurrent);
        await this.loadingService.endLoading();
      },
      async (err) => {
        this.listConstruction = [];
        this.toastrService.createToast(
          'Ocurrió un error obteniendo obras',
          'warning'
        );
        await this.loadingService.endLoading();
      }
    );
  }

  private async sendRequest(): Promise<void> {
    const body: SendEToolBody = {
      reason: this.formState?.constructionId,
      devolutionEstimatedDate: this.formState.dateReturn,
      origin: {
        user: this.formState?.userId,
        construction: this.idConstructionCurrent,
      },
      destination: {
        construction: this.formState?.constructionId,
      },
      tool: this.toolFindByCodeBar?.id,
    };
    await this.loadingService.initLoading('Haciendo proceso de envío');
    this.sicaApiService.sendTool(body).subscribe(
      async (data) => {
        await this.loadingService.endLoading();
        await this.toastrService.createToast(
          'Se ha enviado el equipo con éxito',
          'success'
        );
        this.cleanForm();
        this.router.navigate(['/auth/menu-equipments']);
      },
      async (err) => {
        await this.loadingService.endLoading();
        await this.toastrService.createToast(
          'No se ha podido enviar el equipo',
          'warning'
        );
      }
    );
  }

  private updateForm(key: string, value: string): void {
    this.formState = { ...this.formState, [key]: value };
  }

  private cleanForm(): void {
    this.formState = {
      constructionId: '',
      reasonId: '',
      dateReturn: '',
      userId: '',
    };
  }
}
