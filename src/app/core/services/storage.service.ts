import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { environment } from 'src/environments/environment';

firebase.initializeApp(environment?.firebaseConfig);
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storageRef = firebase.app().storage().ref();

  constructor() { }

  async uploadImageFirebase(pathSaveImg: string, imgBase64: any) {
    try {
      const respuesta = await this.storageRef
        .child(pathSaveImg)
        .putString(imgBase64, 'data_url');
      return await respuesta?.ref?.getDownloadURL();
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
