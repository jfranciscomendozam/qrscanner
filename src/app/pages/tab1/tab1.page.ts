import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  swiperOpts: {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  constructor(private barcodeScanner: BarcodeScanner) {}

  // Ciclo de vida de ionic

  ionViewDidEnter(){
    console.log("al cargar pagina se ejecuta ionViewDidEnter")
  }

  ionViewDidLeave(){
    console.log("al cambiar pagina se ejecuta ionViewDidLeave")
  }

  ionViewWillEnter(){
    console.log("se ejecuta antes de cargar la pagina ionViewWillEnter y antes de ionViewDidEnter")
    this.scan();
  }

  ionViewWillLeave(){
    console.log('se ejecuta al cambiar de pagina ionViewWillLeave, pero antes de ionViewDidLeave')
  }

  scan(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
     }).catch(err => {
         console.log('Error', err);
     });
  }

}
