import { RentedTool } from 'src/app/core/models/RentedTool';
import { BodyPatchReturnRentedTool } from './../../../../../core/models/RentedTool';
import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ToolByBarcodeResponseService } from 'src/app/core/models/Tool';
import { User } from 'src/app/core/models/User';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SicaBackendService } from 'src/app/core/services/sica-backend.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { Loan, UpdateLoanBody } from 'src/app/core/models/Loan';
import { ConstructionService } from 'src/app/core/services/construction.service';
import { Construction } from 'src/app/core/models/Construction';
import { WorkerSica } from 'src/app/core/models/Worker';
import { CategoryTool } from 'src/app/core/models/CategoryTool';
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
  recivedByUser: WorkerSica;
  statusEquipment = true;
  currentConstruction: Construction;
  lastLoan: Loan;
  categoryToolFind: CategoryTool;
  lastRentedTool: RentedTool;

  // Properties form
  quantity = 0;
  remark: string;

  constructor(
    private loadingService: LoadingService,
    private sicaApiService: SicaBackendService,
    private toastrService: ToastService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private constructionService: ConstructionService
  ) {}

  ionViewDidEnter() {
    this.currentConstruction =
      this.constructionService.getConstructionSelected();
  }

  currentIndexStepForm(event: number) {
    this.stepEnd = this.indexStep + 1 === this.menuFormStep?.length;
    this.indexStep = event;
  }

  changeCheckbox(event: string) {
    this.statusEquipment = event === 'return-good';
  }

  getEquipmentByCodeBar(toolByBarcode: ToolByBarcodeResponseService): void {
    this.toolFindByCodeBar = toolByBarcode;
    if (toolByBarcode?.category?.isUnit) {
      this.quantity = 1;
    }
    this.categoryToolFind = null;
    this.getLastLoan(toolByBarcode?.id);
    this.cd?.detectChanges();
  }

  getCategoryCodebar(category: CategoryTool): void {
    this.categoryToolFind = category;
    this.toolFindByCodeBar = null;
    this.getLastLoanCategory(category?.id);
    this.cd?.detectChanges();
  }

  nextStep(): void {
    if (this.stepEnd) {

      if (this.toolFindByCodeBar) {
        this.sendRequest();
        return;
      }
      this.returnRentedTool();
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
    // this.recivedByUser = userNfc;
  }

  getWorker(worker: WorkerSica): void {
    console.log(worker);
    this.recivedByUser = worker;
    this.cd?.detectChanges();
  }

  private sendRequest(): void {
    const body: UpdateLoanBody = {
      return: {
        deliveredBy: this.recivedByUser?.id,
        receivedBy: this.deliveredByUser?.id,
        detail: {
          status: this.statusEquipment ? 'bueno' : 'malo',
          quantity: this.quantity,
        },
        remark: this.remark,
      },
    };

    this.sicaApiService.updateLoan(body, this.lastLoan?.id).subscribe(
      (data) => {
        this.toastrService.createToast(
          'Se ha recibido el equipo con éxito',
          'success'
        );
        this.remark = '';
        this.quantity = 0;
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

  private async returnRentedTool(): Promise<void> {
    const body: BodyPatchReturnRentedTool = {
      return: {
        deliveredBy: this.recivedByUser?.id,
        receivedBy: this.deliveredByUser?.id,
        detail: {
          status: this.statusEquipment ? 'bueno' : 'malo',
          quantity: this.quantity,
        },
        remark: this.remark,
      },
    };
    await this.loadingService.initLoading('Recibiendo equipo... Un momento');
    this.sicaApiService.returnRentedTool(body, this.lastRentedTool?.id).subscribe(
      async (inf) => {
        await this.loadingService.endLoading();
        await this.toastrService.createToast(
          'Se ha recibido el equipo con éxito',
          'success'
        );
        this.remark = '';
        this.quantity = 0;
        this.router.navigate(['/auth/menu-equipments']);
      },
      async (err) => {
        await this.loadingService.endLoading();
        await this.toastrService.createToast(
          'No se ha podido recibir el equipo',
          'warning'
        );
      }
    );
  }

  private async getLastLoanCategory(idCategory: string): Promise<void> {
    await this.loadingService.initLoading(
      'Obteniendo último prestamo de la categoría'
    );
    this.sicaApiService.getLastLoanRentedTool(idCategory).subscribe(
      async (inf) => {
        await this.loadingService.endLoading();
        this.lastRentedTool = inf;
      },
      async (err) => {
        await this.loadingService.endLoading();
      }
    );
  }

  private async getLastLoan(idTool: string): Promise<void> {
    await this.loadingService.initLoading(
      'Obteniendo último prestamo de la herramienta'
    );
    this.sicaApiService
      .getLastLoanOfTool(this.currentConstruction?.id, idTool)
      .subscribe(
        async (data) => {
          await this.loadingService.endLoading();
          this.lastLoan = data;
        },
        async (err) => {
          await this.loadingService.endLoading();
          this.lastLoan = null;
          await this.toastrService.createToast(
            `Ha ocurrido un error obteniendo ultimo prestamo ${JSON.stringify(
              err
            )}`,
            'warning'
          );
        }
      );
  }
}
