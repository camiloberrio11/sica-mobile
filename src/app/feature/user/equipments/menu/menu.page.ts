import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  menuItems = [
    {
      srcImg: 'assets/icon/prestamo-logo.svg',
      title: 'Préstamo',
      routePath: 'auth/loan-equipment',
    },
    {
      srcImg: 'assets/icon/materiales.svg',
      title: 'Mantenimiento',
      routePath: 'auth/maintenance',
    },
    {
      srcImg: 'assets/icon/equipo-alquilado.svg',
      title: 'Equipo alquilado',
      routePath: 'auth/loan-equipment',
    },
    {
      srcImg: 'assets/icon/equipopropio.svg',
      title: 'Equipo propio',
      routePath: 'auth/loan-equipment',
    },
    {
      srcImg: 'assets/icon/inventario.svg',
      title: 'Inventario',
      routePath: 'auth/loan-equipment',
    },
  ];
  constructor() {}

  ngOnInit() {}
}
