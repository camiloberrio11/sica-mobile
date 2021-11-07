import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
type Color = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'light' | 'medium' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastCtrl: ToastController) {}

  async createToast(message: string, type: Color) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      color: type
    });
    toast.present();
  }



}
