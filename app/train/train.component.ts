import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { ITrainService, ITrain} from './train';
import {TrainService} from './train.service';
import { SecurityService } from '../security/security.service';
import { Payload } from '../payload/payload';


@Component({
    selector: 'train-tab',
    templateUrl: 'app/train/train.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class TrainComponent implements OnInit {
    trains: ITrain[];
    errorMessage: string;
    fechaOficialSalida: string;
    selectedOperacion: string = "0";
    private operaciones = [
        {
            value: "0",
            label: "Todos"
        },
        {
            value: "1",
            label: "Carga"
        },
        {
            value: "2",
            label: "Descarga"
        }
    ];
    trainServices: ITrainService[];
    currentTrainService: ITrainService; 


    constructor(private _trainService: TrainService, private _securityService: SecurityService) {}


    ngOnInit(): void {
        var payload = new Payload<string>();
        payload["usuariSessio"] = this._securityService.session.usuari;
        payload["nifSessio"] =  this._securityService.session.nif;
        payload["paisSessio"] =  this._securityService.session.pais;
        payload["token"] =  this._securityService.session.token;
        payload["pagina"] = "1";
        payload["operacion"] = this.selectedOperacion;
        if (this.fechaOficialSalida) {
            payload["fechaOficialSalida"] = this.fechaOficialSalida;
        }        
        this._trainService.getTrainServices(payload)
        .subscribe(
            trainServicesResponse => {
                // Check de seguretat
                this.trainServices = trainServicesResponse.lista;
                
            },
            error => this.errorMessage = <any>error);
    }

    search() {
        var payload = new Payload<string>();
        payload["usuariSessio"] = this._securityService.session.usuari;
        payload["nifSessio"] =  this._securityService.session.nif;
        payload["paisSessio"] =  this._securityService.session.pais;
        payload["token"] =  this._securityService.session.token;
        payload["pagina"] = "1";
        payload["operacion"] = this.selectedOperacion;
        if (this.fechaOficialSalida) {
            payload["fechaOficialSalida"] = this.fechaOficialSalida;
        }        
        this._trainService.getTrains(payload)
        .subscribe(
            trains => this.trains = trains,
            error => this.errorMessage = <any>error);
    }
}