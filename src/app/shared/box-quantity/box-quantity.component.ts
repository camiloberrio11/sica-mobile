import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-box-quantity',
  templateUrl: './box-quantity.component.html',
  styleUrls: ['./box-quantity.component.scss'],
})
export class BoxQuantityComponent implements OnInit {
  @Input() label: string;
  @Output() valueInput: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {}

  handleInput(event): void {
    this.valueInput.emit(event?.target?.value);
  }

}
