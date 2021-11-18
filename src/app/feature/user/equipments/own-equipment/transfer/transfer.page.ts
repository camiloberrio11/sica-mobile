import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.page.html',
  styleUrls: ['./transfer.page.scss'],
})
export class TransferPage implements OnInit {
  menuItems = [
    {
      srcImg: 'assets/icon/devolucionn.svg',
      title: 'Recepción',
      routePath: 'auth/own-equipment/transfer/reception',
    },
    {
      srcImg: 'assets/icon/devolucion.svg',
      title: 'Envío',
      routePath: 'auth/own-equipment/transfer/send',
    },

  ];
  constructor() { }

  ngOnInit() {
  }

}
