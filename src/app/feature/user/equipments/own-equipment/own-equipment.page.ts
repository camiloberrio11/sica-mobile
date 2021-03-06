import { ConstructionService } from './../../../../core/services/construction.service';
import { Construction } from './../../../../core/models/Construction';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-own-equipment',
  templateUrl: './own-equipment.page.html',
  styleUrls: ['./own-equipment.page.scss'],
})
export class OwnEquipmentPage implements OnInit {
  constructionSelected: Construction;
  menuItems = [
    {
      srcImg: 'assets/icon/prestamo-logo.svg',
      title: 'Registro',
      routePath: 'auth/own-equipment/register',
    },
    {
      srcImg: 'assets/icon/materiales.svg',
      title: 'Traslado',
      routePath: 'auth/own-equipment/transfer',
    },
    {
      srcImg: 'assets/icon/equipo-alquilado.svg',
      title: 'Hoja de vida',
      routePath: 'auth/own-equipment/history',
    },
    {
      srcImg: 'assets/icon/equipopropio.svg',
      title: 'Informes',
      routePath: 'auth/own-equipment/reports',
    },
  ];
  constructor(private constructionService: ConstructionService) { }

  ngOnInit() {
  }

  ionViewDidEnter(): void {
    this.constructionSelected = this.constructionService.getConstructionSelected();
  }

}
