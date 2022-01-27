import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-box-quantity',
  templateUrl: './box-quantity.component.html',
  styleUrls: ['./box-quantity.component.scss'],
})
export class BoxQuantityComponent implements OnInit {
  @Input() label: string;
  @Input() value  = '';
  @Input() typeInput  = 'text';
  @Input() disabled: boolean;
  @Output() valueInput: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {}

  handleInput(event): void {
    this.valueInput.emit(event?.target?.value);
  }

}
