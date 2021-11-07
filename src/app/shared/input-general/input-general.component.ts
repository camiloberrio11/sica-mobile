import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-general',
  templateUrl: './input-general.component.html',
  styleUrls: ['./input-general.component.scss'],
})
export class InputGeneralComponent implements OnInit {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() value: string;
  @Input() srcIcon: string;
  @Input() typeInput: 'text' | 'password';

  constructor() {}

  ngOnInit() {}
}
