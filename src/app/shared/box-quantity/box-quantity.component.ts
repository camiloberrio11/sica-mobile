import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-box-quantity',
  templateUrl: './box-quantity.component.html',
  styleUrls: ['./box-quantity.component.scss'],
})
export class BoxQuantityComponent implements OnInit {
  @Input() label: string;
  constructor() { }

  ngOnInit() {}

}
