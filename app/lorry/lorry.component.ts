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
    currentItem: string;
    private values = [
        {
            key: "1",
            value: "ENTRADA"
        },
        {
            key: "2",
            value: "SALIDA"
        }
    ]
    
    constructor(private _lorryService: LorryService) { }

    search() {
        this._lorryService.getLorryMovements()
            .subscribe(
            lorryMovements => this.lorryMovements = lorryMovements,
            error => this.errorMessage = <any>error);
    }

    closeMovement(movement) {
        console.log(`Lorry movement to close = [${movement.idMov}]`);
    }
    
    onItemChange(currentItem) {
        this.currentItem = currentItem;
        // currentItem sempres està un per devant al index de l'array de valors
        console.log(`selected = [${this.values[currentItem-1].value}]`);
    }
}