import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-return',
  templateUrl: './return.page.html',
  styleUrls: ['./return.page.scss'],
})
export class ReturnPage implements OnInit {
  listAddedEquipments: {name: string}[] = [];
  constructor() {}

  ngOnInit() {}

  addEquipment(): void {
    this.listAddedEquipments.push({name: `Test prueba agregado ${this.listAddedEquipments?.length + 1}`});
  }

  save(): void {
    alert('Guardado');
  }

  sendEmail(): void {
    alert('Correo enviado');
  }
}
