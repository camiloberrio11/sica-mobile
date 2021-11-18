import { ConstructionService } from './../../../../core/services/construction.service';
import { Construction } from './../../../../core/models/Construction';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-equipment-rented',
  templateUrl: './equipment-rented.page.html',
  styleUrls: ['./equipment-rented.page.scss'],
})
export class EquipmentRentedPage implements OnInit {
  constructionSelected: Construction;
  menuItems = [
    {
      srcImg: 'assets/icon/ingreso.svg',
      title: 'Ingreso',
      routePath: 'auth/equipment-rented/entry',
    },
    {
      srcImg: 'assets/icon/devolucion.svg',
      title: 'Devolución',
      routePath: 'auth/equipment-rented/return',
    },
    {
      srcImg: 'assets/icon/preliquidacion.svg',
      title: 'Preliquidación',
      routePath: 'auth/equipment-rented/pre-settlement',
    },
    {
      srcImg: 'assets/icon/informe.svg',
      title: 'Informes',
      routePath: 'auth/equipment-rented/reports',
    },
  ];
  constructor(private constructionService: ConstructionService) { }

  ngOnInit() {
  }

  ionViewDidEnter(): void {
    this.constructionSelected = this.constructionService.getConstructionSelected();
  }

}
