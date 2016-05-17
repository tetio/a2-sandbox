import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';
import { ITrainService, ITrain} from './train';
import {TrainService} from './train.service';
import { SecurityService } from '../security/security.service';
import { Payload } from '../payload/payload';
import {Button, Dialog, SelectItem, Dropdown, Calendar} from 'primeng/primeng';


@Component({
    selector: 'train-tab',
    templateUrl: 'app/train/trainEquips.component.html',
    directives: [Dropdown, Dialog, Button, Calendar]
})

export class TrainEquipsComponent implements OnInit {
    trainEquips: IT
    constructor(private _trainService: TrainService,
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
        this._trainService.getTrainServices(payload)
            .subscribe(
            trainServicesResponse => {
                // Check de seguretat
                this.selectedTrainService = trainServicesResponse.lista[0].value;
                this.trainServices = trainServicesResponse.lista;
 

            },
            error => this.errorMessage = <any>error);        
    }
}