import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SicaBackendService } from 'src/app/core/services/sica-backend.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  indexStep = 0;
  menuFormStep: string[] = ['Foto', 'Datos', 'Factura'];
  stepEnd = false;

  listSupplier: {id: string; value: string}[] = [];
  listBrand: {id: string; value: string}[] = [];

  constructor(
    private loadingService: LoadingService,
    private sicaBackend: SicaBackendService
  ) {}

  ngOnInit() {
  }

  ionViewDidEnter(): void {
    this.getSupplier();
  }

  currentIndexStepForm(event: number) {
    this.stepEnd = this.indexStep + 1 === this.menuFormStep?.length;
    this.indexStep = event;
  }

  nextStep(): void {
    if (this.stepEnd) {
      // this.sendRequest();
      return;
    }
    this.indexStep = this.indexStep + 1;
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
        // this.getBrand();
      },
      async (err) => {
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
        await this.loadingService.endLoading();
      }
    );
  }

}
