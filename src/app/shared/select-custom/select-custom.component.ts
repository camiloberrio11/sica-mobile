import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select-custom',
  templateUrl: './select-custom.component.html',
  styleUrls: ['./select-custom.component.scss'],
})
export class SelectCustomComponent implements OnInit {
  @Input() label: string;
  @Input() canSearch: boolean;
  @Input() placeholder: string;
  @Input() optionsList: { id: string; value: string }[];
  @Output() selectItem: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  select(event: any) {
    const value = event?.id || event?.detail?.value || event?.value;
    if (value) {
      this.selectItem.emit(value);
    }
  }
}
