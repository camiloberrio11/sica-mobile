import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-custom',
  templateUrl: './select-custom.component.html',
  styleUrls: ['./select-custom.component.scss'],
})
export class SelectCustomComponent implements OnInit {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() optionsList: { id: string; value: string }[];

  constructor() {}

  ngOnInit() {}

  select(event: any) {
    console.log('Select item in select custom component', event?.detail);
  }
}
