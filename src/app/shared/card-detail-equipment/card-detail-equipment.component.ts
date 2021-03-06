import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-detail-equipment',
  templateUrl: './card-detail-equipment.component.html',
  styleUrls: ['./card-detail-equipment.component.scss'],
})
export class CardDetailEquipmentComponent implements OnChanges {
  @Input() brand: string;
  @Input() categoryName: string;
  @Input() reference: string;
  @Input() isOwned: boolean;
  @Input() serial: string;

  constructor() { }

  ngOnChanges() {
    console.log('cc');
  }

}
