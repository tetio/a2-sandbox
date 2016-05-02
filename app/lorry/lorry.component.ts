import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import {ILorryMovement} from './lorryMovement';
import {LorryService} from './lorry.service';


@Component({
    selector: 'lorry-tab',
    templateUrl: 'app/lorry/lorry.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class LorryComponent {
    lorryMovements: ILorryMovement[];
    errorMessage: string;

    constructor(private _lorryService: LorryService) {}

    search() {
        this._lorryService.getLorryMovements()
        .subscribe(
            lorryMovements => this.lorryMovements = lorryMovements,
            error => this.errorMessage = <any>error);
    }
}