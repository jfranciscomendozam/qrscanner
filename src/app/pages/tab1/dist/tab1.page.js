"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Tab1Page = void 0;
var core_1 = require("@angular/core");
var Tab1Page = /** @class */ (function () {
    function Tab1Page(barcodeScanner, dataLocal) {
        this.barcodeScanner = barcodeScanner;
        this.dataLocal = dataLocal;
    }
    // Ciclo de vida de ionic
    Tab1Page.prototype.ionViewDidEnter = function () {
        console.log("al cargar pagina se ejecuta ionViewDidEnter");
    };
    Tab1Page.prototype.ionViewDidLeave = function () {
        console.log("al cambiar pagina se ejecuta ionViewDidLeave");
    };
    Tab1Page.prototype.ionViewWillEnter = function () {
        console.log("se ejecuta antes de cargar la pagina ionViewWillEnter y antes de ionViewDidEnter");
        this.scan();
    };
    Tab1Page.prototype.ionViewWillLeave = function () {
        console.log('se ejecuta al cambiar de pagina ionViewWillLeave, pero antes de ionViewDidLeave');
    };
    Tab1Page.prototype.scan = function () {
        var _this = this;
        this.barcodeScanner.scan().then(function (barcodeData) {
            console.log('Barcode data', barcodeData);
            if (!barcodeData.cancelled) {
                _this.dataLocal.guardarRegistro(barcodeData.format, barcodeData.text);
            }
        })["catch"](function (err) {
            console.log('Error', err);
            _this.dataLocal.guardarRegistro(barcodeData.format, barcodeData.text);
        });
    };
    Tab1Page = __decorate([
        core_1.Component({
            selector: 'app-tab1',
            templateUrl: 'tab1.page.html',
            styleUrls: ['tab1.page.scss']
        })
    ], Tab1Page);
    return Tab1Page;
}());
exports.Tab1Page = Tab1Page;
