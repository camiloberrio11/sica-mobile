import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  appPages = [
    { title: 'INICIO', url: '/auth/select-construction', icon: 'home' },
    { title: 'MATERIALES', url: '/auth/select-construction', icon: 'color-fill' },
    { title: 'EQUIPOS', url: '/auth/select-construction', icon: 'construct' },
    { title: 'CAMBIAR OBRA', url: '/auth/select-construction', icon: 'sync' },
    { title: 'TOKENS', url: '/auth/create-token', icon: 'ticket' },
    { title: 'CERRAR SESIÓN', url: '/login', icon: 'log-out' },
  ];
  constructor() {}

  ngOnInit() {}
}
