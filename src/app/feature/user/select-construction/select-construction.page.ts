import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Construction } from 'src/app/core/models/Construction';
import { ConstructionService } from 'src/app/core/services/construction.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SicaBackendService } from 'src/app/core/services/sica-backend.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-select-construction',
  templateUrl: './select-construction.page.html',
  styleUrls: ['./select-construction.page.scss'],
})
export class SelectConstructionPage  {
  listConstruction: Construction[] = [];

  constructor(
    private selectConstructionService: ConstructionService,
    private loadingService: LoadingService,
    private sicaApi: SicaBackendService,
    private toastrService: ToastService,
    private router: Router
  ) { }

  ionViewWillEnter() {
    this.getConstruction();
  }


  changeConstruction(event: { detail: { value: Construction } }) {
    const construction = event?.detail?.value;
    if (construction) {
      this.selectConstructionService.selectConstruction(construction);
      this.router.navigate(['/auth/select-flow']);
    }
  }

  getConstruction() {
    this.loadingService.initLoading('Cargando construcciones');
    this.sicaApi.getConstruiction().subscribe(
      (constr) => {
        this.listConstruction = constr;
        this.loadingService.endLoading();
      },
      (err) => {
        this.toastrService.createToast('Ocurrió un error obteniendo las obras', 'danger');
        this.loadingService.endLoading();
      }
    );
  }


}
