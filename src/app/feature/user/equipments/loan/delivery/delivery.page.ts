import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SicaBackendService } from 'src/app/core/services/sica-backend.service';

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

  constructor(
    private loadingService: LoadingService,
    private sicaApiService: SicaBackendService
  ) {
    this.buildForm();
  }

  ngOnInit() {}

  inputChange(
    event: string,
    formcontrolname?: string
  ): void {
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



   getEquipmentByCodeBar(codebar: string): void {
    this.loadingService.initLoading('Obtiendo equipo');
    this.sicaApiService.getToolByCodeBar(codebar).subscribe(
      (data) => {
        this.loadingService.endLoading();
        console.log(data);
      },
      (err) => {
        this.loadingService.endLoading();
        console.error(err);
      }
    );
  }

  private sendRequest(): void {
    console.log('soy form', this.formDelivery.value);
    alert('Equipo entregado');
  }

  private buildForm(): void {
    this.formDelivery = new FormGroup({
      codebar: new FormControl('', Validators.required),
    });
  }
}
