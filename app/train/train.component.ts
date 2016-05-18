import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';
import {ITrainQueryResponse, ITrainService, ITrain} from './train';
import { TrainService } from './train.service';

import { SecurityService } from '../security/security.service';
import { Payload } from '../payload/payload';
import {Button, Dialog, SelectItem, Dropdown, Calendar} from 'primeng/primeng';


@Component({
    selector: 'train-tab',
    templateUrl: 'app/train/train.component.html',
    directives: [Dropdown, Dialog, Button, Calendar]
})

export class TrainComponent implements OnInit {
    trains: ITrain[];
    errorMessage: string;
    fechaOficialSalida: string;
    selectedOperacion: string = "0";
    private operaciones = [
        {
            value: "0",
            label: "Operaciones"
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
    selectedTrainService: string = "";
    es: any;


    constructor(private _trainService: TrainService, 
        private _securityService: SecurityService,
        private _router: Router) { }


    ngOnInit(): void {
        // ---- primeng calendari en castella
        this.es = {
            closeText: "Cerrar",
            prevText: "<Ant",
            nextText: "Sig>",
            currentText: "Hoy",
            monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio",
                "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
            monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun",
                "jul", "ago", "sep", "oct", "nov", "dic"],
            dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
            dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
            dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
            weekHeader: "Sm",
            dateFormat: "dd/mm/yy",
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ""
        };
        // ----
        var payload = new Payload<string>();
        payload["usuariSessio"] = this._securityService.session.usuari;
        payload["nifSessio"] = this._securityService.session.nif;
        payload["paisSessio"] = this._securityService.session.pais;
        payload["token"] = this._securityService.session.token;
        payload["pagina"] = "1";
        payload["operacion"] = this.selectedOperacion;
        if (this.fechaOficialSalida) {
            payload["fechaOficialSalida"] = this.fechaOficialSalida;
        }
        this._trainService.getTrainServices(payload)
            .subscribe(
            trainServicesResponse => {
                // Check de seguretat
                this.selectedTrainService = trainServicesResponse.lista[0].value;
                this.trainServices = trainServicesResponse.lista;
 

            },
            error => this.errorMessage = <any>error);
    }

    search() {
        var payload = new Payload<string>();
        payload["usuariSessio"] = this._securityService.session.usuari;
        payload["nifSessio"] = this._securityService.session.nif;
        payload["paisSessio"] = this._securityService.session.pais;
        payload["token"] = this._securityService.session.token;
        payload["pagina"] = "1";
        payload["operacion"] = this.selectedOperacion;
        payload["servicio"] = this.selectedTrainService;
        if (this.fechaOficialSalida) {
            payload["fechaOficialSalida"] = this.fechaOficialSalida;
        }
        this._trainService.getTrains(payload)
            .subscribe(
            trainsResponse => {this.trains = trainsResponse.lista.map((train: ITrain) => {
                    let result = {
                        servicio: train.servicio,
                        fechaOficialSalida: train.fechaOficialSalida,
                        fechaRealLlegada: train.fechaRealLlegada,
                        idTren: train.idTren,
                        operacion: train.operacion,
                        fos: new Date(train.fechaOficialSalida),
                        frl: new Date(train.fechaRealLlegada)
                    };
                    return result;
                });
            },
            error => this.errorMessage = <any>error);
    }


    public selectTrain(train: ITrain) {
        this._trainService.selectedTrain = train;
        // TODO saltar a detall del tren
        this._router.navigate(['TrainEquips']);
    }
}