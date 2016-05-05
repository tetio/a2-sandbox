import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import {ILorryMovement} from './lorryMovement';
import {LorryService} from './lorry.service';
import { SecurityService } from '../security/security.service';
import { Payload } from '../payload/payload';
import { SpinnerComponent } from '../shared/spinner/spinner.component';

@Component({
    selector: 'lorry-tab',
    templateUrl: 'app/lorry/lorry.component.html',
    directives: [ROUTER_DIRECTIVES, 
        SpinnerComponent]
})
export class LorryComponent {
    lorryMovements: ILorryMovement[];
    notFoundMessage: boolean = false;
    errorMessage: string;
    currentItem: string = "1";
    equipId: string;
    public isRequesting: boolean;
    
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

    constructor(private _lorryService: LorryService, private _securityService: SecurityService) { }

    search() {
        this.isRequesting = true;
        this.lorryMovements = [];        
        var payload = new Payload<string>();
        payload["usuariSessio"] = this._securityService.session.usuari;
        payload["nifSessio"] =  this._securityService.session.nif;
        payload["paisSessio"] =  this._securityService.session.pais;
        payload["token"] =  this._securityService.session.token;
        payload["pagina"] = "1";
        payload["tipoSelect"] = this.currentItem;
        if (this.equipId) {
            payload["contenedor"] = this.equipId;
        }
        this._lorryService.getLorryMovements(payload)
            .subscribe(
                lorryMovements => this.movementsReceived(lorryMovements), 
                error => this.errorMessage = <any>error,
                () => this.stopRefreshing()
            ); 
    }

    movementsReceived(lorryMovements: ILorryMovement[]) {
        this.lorryMovements = lorryMovements;
        this.notFoundMessage = (lorryMovements.length == 0);

    }

    closeMovement(movement) {
        console.log(`Lorry movement to close = [${movement.idMov}]`);
    }

    onItemChange(currentItem) {
        this.currentItem = currentItem;
        // currentItem sempres està un per devant al index de l'array de valors
        console.log(`selected = [${this.values[currentItem - 1].value}]`);
    }
    
    private stopRefreshing() {
        this.isRequesting = false;
    }    
}