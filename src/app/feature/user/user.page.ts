import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  appPages = [
    { title: 'INICIO', url: '/auth/select-construction', icon: 'home' },
    { title: 'TOKENS', url: '/folder/Inbox', icon: 'ticket' },
    { title: 'CERRAR SESIÓN', url: '/folder/Inbox', icon: 'log-out' },

    // { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    // { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    // { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    // { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  constructor() {}

  ngOnInit() {}
}
