import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.page.html',
  styleUrls: ['./transfer.page.scss'],
})
export class TransferPage implements OnInit {
  menuItems = [
    {
      srcImg: 'assets/icon/prestamo-logo.svg',
      title: 'Recepción',
      routePath: 'auth/own-equipment/transfer/reception',
    },
    {
      srcImg: 'assets/icon/materiales.svg',
      title: 'Envío',
      routePath: 'auth/own-equipment/transfer/send',
    },

  ];
  constructor() { }

  ngOnInit() {
  }

}
