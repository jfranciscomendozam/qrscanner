import { Injectable } from '@angular/core';
import { Registro } from 'platforms/android/app/models/registro.model';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { File as ionFile } from '@ionic-native/file/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  guardados: Registro[] = [];

  constructor( private storage: Storage,
               private navCtrl: NavController,
               private iab: InAppBrowser,
               private file: ionFile,
               private emailComposer: EmailComposer) {

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

  enviarCorreo(){

    const arrTemp = [];
    const titulos = 'Tipo, Formato, Creado en, Texto\n';
    
    arrTemp.push(titulos);
    
    this.guardados.forEach(registro => {
      const linea = `${registro.type}, ${registro.format}, ${registro.created}, ${registro.text.replace(',',' ')}\n`
      arrTemp.push(linea);
    })

    this.crearArchivoFisico(arrTemp.join(''));
  }

  crearArchivoFisico(text:string){

    this.file.checkFile(this.file.dataDirectory, 'registros.csv')
      .then(existe => {
        console.log('Existe archivo ',existe);
        return this.escribirEnArchivo(text);
      }).catch(err => {
        console.log('Archivo no existe');
        this.file.createFile(this.file.dataDirectory, 'registros.csv', false) 
          .then(creado => {
            // false significa no reemplazar archivo
            this.escribirEnArchivo(text);
          }).catch(err => {
            console.log('No se pudo crear el archivo');
          })
      })
  }

  async escribirEnArchivo(text:string) {
    await this.file.writeExistingFile(this.file.dataDirectory, 'registros.csv', text);
    
    const archivo = `${this.file.dataDirectory}/registros.csv`
    //console.log(this.file.dataDirectory + 'registros.csv');

    const email = {
      to: 'jfranciscomendozam@gmail.com',
      //cc: '',
      //bcc: [],
      attachments: [
        // 'file://img/logo.png',
        // 'res://icon.png',
        // 'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
        // 'file://README.pdf'
        archivo
      ],
      subject: 'Backup scan',
      body: 'Adjunto backup de sus scanner - <strong>QRScanner</strong>',
      isHtml: true
    }
    
    // Send a text message using default options
    this.emailComposer.open(email); // tambien recibe una promesa 
  }

}
