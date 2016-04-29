System.register(['angular2/core', 'angular2/router', './lorry.Service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, lorry_Service_1;
    var LorryComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (lorry_Service_1_1) {
                lorry_Service_1 = lorry_Service_1_1;
            }],
        execute: function() {
            LorryComponent = (function () {
                function LorryComponent(_lorryService) {
                    this._lorryService = _lorryService;
                }
                LorryComponent.prototype.search = function () {
                    var _this = this;
                    this._lorryService.getLorryMovements()
                        .subscribe(function (lorryMovements) { return _this.lorryMovements = lorryMovements; }, function (error) { return _this.errorMessage = error; });
                };
                LorryComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/lorry/lorry.component.html',
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [lorry_Service_1.LorryService])
                ], LorryComponent);
                return LorryComponent;
            }());
            exports_1("LorryComponent", LorryComponent);
        }
    }
});
//# sourceMappingURL=lorry.component.js.map