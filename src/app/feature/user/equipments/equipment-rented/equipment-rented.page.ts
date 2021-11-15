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
      srcImg: 'assets/icon/prestamo-logo.svg',
      title: 'Ingreso',
      routePath: 'auth/loan-equipment',
    },
    {
      srcImg: 'assets/icon/materiales.svg',
      title: 'Devolución',
      routePath: 'auth/maintenance',
    },
    {
      srcImg: 'assets/icon/equipo-alquilado.svg',
      title: 'Preliquidación',
      routePath: 'auth/equipment-rented',
    },
    {
      srcImg: 'assets/icon/equipopropio.svg',
      title: 'Informes',
      routePath: 'auth/loan-equipment',
    },
  ];
  constructor(private constructionService: ConstructionService) { }

  ngOnInit() {
  }

  ionViewDidEnter(): void {
    this.constructionSelected = this.constructionService.getConstructionSelected();
  }

}
