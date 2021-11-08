import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor() {
    this.buildForm();
  }

  ngOnInit() {}

  inputChange(event: string, formcontrolname?: string): void {
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

  private sendRequest(): void {
    console.log('soy form', this.formDelivery);
    alert('Equipo entregado');
  }

  private buildForm(): void {
    this.formDelivery = new FormGroup({
      codebar: new FormControl('', Validators.required),
      // password: new FormControl('', Validators.required),
    });
  }
}
