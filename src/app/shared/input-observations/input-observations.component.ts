import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-observations',
  templateUrl: './input-observations.component.html',
  styleUrls: ['./input-observations.component.scss'],
})
export class InputObservationsComponent implements OnInit {
  @Input() placeholder: string;

  constructor() { }

  ngOnInit() {}

}
