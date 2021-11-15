import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-send',
  templateUrl: './send.page.html',
  styleUrls: ['./send.page.scss'],
})
export class SendPage implements OnInit {
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
