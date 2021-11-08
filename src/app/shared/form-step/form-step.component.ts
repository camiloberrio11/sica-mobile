import { Component, Input, OnChanges, EventEmitter, Output } from '@angular/core';



@Component({
  selector: 'app-form-step',
  templateUrl: './form-step.component.html',
  styleUrls: ['./form-step.component.scss'],
})
export class FormStepComponent implements OnChanges {
  @Input() listItems: string[];
  @Input() currentIndexInForm: number;
  @Output() indexCurrent: EventEmitter<number> = new EventEmitter<number>();


  currentIndex = 0;
  constructor() { }

  ngOnChanges() {
    this.currentIndex = this.currentIndexInForm;
    this.emitCurrentIndex();
  }

  setIndexStep(index: number): void {
    this.currentIndex = index;
    this.emitCurrentIndex();
  }

  emitCurrentIndex() {
    this.indexCurrent.emit(this.currentIndex);
  }

}
