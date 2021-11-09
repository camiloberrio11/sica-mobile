import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-observations',
  templateUrl: './input-observations.component.html',
  styleUrls: ['./input-observations.component.scss'],
})
export class InputObservationsComponent implements OnInit {
  @Input() placeholder: string;
  @Output() valueInput: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  handleInput(event): void {
    this.valueInput.emit(event?.target?.value);
  }
}
