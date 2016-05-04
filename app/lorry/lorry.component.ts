import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import {ILorryMovement} from './lorryMovement';
import {LorryService} from './lorry.service';
import { Payload } from '../payload/payload';


@Component({
    selector: 'lorry-tab',
    templateUrl: 'app/lorry/lorry.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class LorryComponent {
    lorryMovements: ILorryMovement[];
    errorMessage: string;
    currentItem: string = "1";
    equipId: string;
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
        var payload = new Payload<string>();
        payload["usuariSessio"] = "QATI";// TODO: To be replaced with session data
        payload["nifSessio"] = "Q99999999";// TODO: To be replaced with session data
        payload["paisSessio"] = "ES";// TODO: To be replaced with session data
        payload["pagina"] = "1";
        payload["tipoSelect"] = this.currentItem;
        if (this.equipId ) {
            payload["contenedor"] = this.equipId;
        }
        this._lorryService.getLorryMovements(payload)
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