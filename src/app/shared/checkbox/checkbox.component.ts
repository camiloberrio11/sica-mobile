import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit {
  @Input() id: string;
  @Input() label: string;
  @Input() checked: boolean;
  @Output() changeCheckBox: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  handleChange(event: any): void {
    const idcheck: string = event?.target?.id;
    this.changeCheckBox.emit(idcheck);
  }
}
