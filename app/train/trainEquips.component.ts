import { Component, OnInit } from 'angular2/core';
import { Router} from 'angular2/router';
import { ITrainEquip, ITrain} from './train';
import {TrainService} from './train.service';
import { LocationService } from '../location/location.service';
import { SecurityService } from '../security/security.service';
import { Payload } from '../payload/payload';
import { Button, Dialog, SelectItem, Dropdown, Calendar } from 'primeng/primeng';


@Component({
    selector: 'train-tab',
    templateUrl: 'app/train/trainEquips.component.html',
    directives: [Dropdown, Dialog, Button, Calendar]
})

export class TrainEquipsComponent implements OnInit {
    trainEquips: ITrainEquip[];
    errorMessage: string;
    selectedEquip: ITrainEquip;
  
    displayConfirmation: boolean=false;
  
    constructor(private _locationService: LocationService,
        private _trainService: TrainService,
        private _securityService: SecurityService,
        private _router: Router) { }

    ngOnInit(): void {
       var payload = new Payload<string>();
        payload["usuariSessio"] = this._securityService.session.usuari;
        payload["nifSessio"] = this._securityService.session.nif;
        payload["paisSessio"] = this._securityService.session.pais;
        payload["token"] = this._securityService.session.token;
        payload["pagina"] = "1";
        payload["idTren"] = this._trainService.selectedTrain.idTren;
        this._trainService.getTrainEquips(payload)
            .subscribe(
            trainEquipsResponse => {
                // Check de seguretat;
                this.trainEquips = trainEquipsResponse.lista;
            },
            error => this.errorMessage = <any>error);        
    }
    
    goBack() {
        this._router.navigate(['Train']);
    }
    
    selectEquip(equip) {
        this.selectedEquip = equip;
        this.displayConfirmation = true;   
    }

    deselectEquip() {
        this.selectedEquip = null;
        this.displayConfirmation = false;   
    }
    
    public confirmEquip():void{
        // TODO
    }
}