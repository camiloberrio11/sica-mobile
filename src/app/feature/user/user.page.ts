import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  appPages = [
    { title: 'INICIO', url: '/auth/select-construction', icon: 'home' },
    { title: 'TOKENS', url: '/auth/create-token', icon: 'ticket' },
    { title: 'CERRAR SESIÓN', url: '/login', icon: 'log-out' },
  ];
  constructor() {}

  ngOnInit() {}
}
