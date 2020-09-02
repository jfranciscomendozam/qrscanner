"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DataLocalService = void 0;
var core_1 = require("@angular/core");
var registro_model_1 = require("platforms/android/app/models/registro.model");
var DataLocalService = /** @class */ (function () {
    function DataLocalService() {
        this.guardados = [];
    }
    DataLocalService.prototype.guardarRegistro = function (format, text) {
        var nuevoRegistro = new registro_model_1.Registro(format, text);
        this.guardados.unshift(nuevoRegistro);
    };
    DataLocalService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], DataLocalService);
    return DataLocalService;
}());
exports.DataLocalService = DataLocalService;
