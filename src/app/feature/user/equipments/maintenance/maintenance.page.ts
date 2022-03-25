import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Construction } from 'src/app/core/models/Construction';
import { ConstructionService } from 'src/app/core/services/construction.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.page.html',
  styleUrls: ['./maintenance.page.scss'],
})
export class MaintenancePage {
  constructionSelected: Construction;

  menuItems = [
    {
      srcImg: 'assets/icon/prestamo-logo.svg',
      title: 'Enviar',
      routePath: 'auth/maintenance/send',
    },
    {
      srcImg: 'assets/icon/materiales.svg',
      title: 'Recibir',
      routePath: 'auth/maintenance/return',
    },
    {
      srcImg: 'assets/icon/informe.svg',
      title: 'Registrar',
      routePath: 'auth/maintenance/register',
    },

  ];

  constructor(private constructionService: ConstructionService) {}

  ionViewDidEnter(): void {
    this.constructionSelected =
      this.constructionService.getConstructionSelected();
  }
}
