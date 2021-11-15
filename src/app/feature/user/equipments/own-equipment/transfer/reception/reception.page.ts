import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.page.html',
  styleUrls: ['./reception.page.scss'],
})
export class ReceptionPage implements OnInit {
  indexStep = 0;
  menuFormStep: string[] = ['Equipo', 'Destino'];
  stepEnd = false;

  constructor() { }

  ngOnInit() {
  }

  nextStep(): void {
    if (this.stepEnd) {
      // this.sendRequest();
      return;
    }
    this.indexStep = this.indexStep + 1;
  }

  currentIndexStepForm(event: number) {
    this.stepEnd = this.indexStep + 1 === this.menuFormStep?.length;
    this.indexStep = event;
  }

}
