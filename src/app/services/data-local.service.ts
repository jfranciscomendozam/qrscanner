import { Injectable } from '@angular/core';
import { Registro } from 'platforms/android/app/models/registro.model';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  guardados: Registro[] = [];

  constructor( private storage: Storage,
               private navCtrl: NavController,
               private iab: InAppBrowser) {

    // Cargar registros
    // this.storage.get('registros')
    //   .then(registros => {
    //     this.guardados = registros || [];
    // })

    this.cargarStorage();
  }

  async cargarStorage(){
    this.guardados = await this.storage.get('registros') || [];
  }

  async guardarRegistro(format:string, text:string){

    await this.cargarStorage()
    
    const nuevoRegistro = new Registro(format, text);
    this.guardados.unshift(nuevoRegistro); // unshift quede en la primera posicion
    console.log(this.guardados)
    this.storage.set('registros',this.guardados)

   this.abrirRegistro(nuevoRegistro)

  }

  abrirRegistro( registro: Registro) {
    this.navCtrl.navigateForward('/tabs/tab2');
    
    switch (registro.type) {
      case 'http':
        // abrir navegador web
        this.iab.create(registro.text, '_system');
        break;

      case 'geo':
          this.navCtrl.navigateForward(`/tabs/tab2/mapa/${registro.text}`);

      default:
        break;
    }

  }

}
