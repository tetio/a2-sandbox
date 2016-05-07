import { Component, OnInit, ViewChild } from 'angular2/core';
import {MODAL_DIRECTIVES, ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal'
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
        MODAL_DIRECTIVES,
        SpinnerComponent]
})
export class LorryComponent {
    lorryMovements: ILorryMovement[];
    notFoundMessage: boolean = false;
    errorMessage: string;
    errors: string[];
    confirmationMessage: string;
    selectedMovementType: string = "1";
    selectedMovement: ILorryMovement;
    equipId: string;
    // Spinner
    public isRequesting: boolean;
    // Modal Popup
    @ViewChild('movementConfirmationModal')
    modal: ModalComponent;

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
        this.selectedMovement = null;
        var payload = new Payload<string>();
        payload["usuariSessio"] = this._securityService.session.usuari;
        payload["nifSessio"] =  this._securityService.session.nif;
        payload["paisSessio"] =  this._securityService.session.pais;
        payload["token"] =  this._securityService.session.token;
        payload["pagina"] = "1";
        payload["tipoSelect"] = this.selectedMovementType;
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
        this.selectedMovementType = currentItem;
        // currentItem sempres està un per devant al index de l'array de valors
        console.log(`selected = [${this.values[currentItem - 1].value}]`);
    }


    public literalCraneLorry(camionOGrua: number) {
        return (camionOGrua == 1)? "CAMIÓN":"GRÚA"
    }


    public selectMovement(movement: ILorryMovement) {
        this.selectedMovement = movement;
        this.confirmationMessage = `Desea confirmar el equipo ${this.selectedMovement.contenedor.toUpperCase()}?`;
        this.modal.open('sm');
    }

    public confirmMovement() {
        if (this.selectedMovement.camionOGrua == 1) {
           this.confirmLorry();
        } else {
            this.confirmCrane();
        }
    }


    public confirmCrane() {
        var payload = new Payload<string>();
        payload["usuariSessio"] = this._securityService.session.usuari;
        payload["nifSessio"] =  this._securityService.session.nif;
        payload["paisSessio"] =  this._securityService.session.pais;
        payload["token"] =  this._securityService.session.token;
        payload["idMov"] = this.selectedMovement.idMov.toString();
        this._lorryService.confirmCraneMovement(payload)
            .subscribe(
            errors => {
                    this.errors = errors;
                    if (errors.length == 0) {
                        this.search();
                }},
                error => this.errorMessage = <any>error,
                () => this.close()
            );
    }

    public confirmLorry() {
        var payload = new Payload<string>();
        payload["usuariSessio"] = this._securityService.session.usuari;
        payload["nifSessio"] =  this._securityService.session.nif;
        payload["paisSessio"] =  this._securityService.session.pais;
        payload["token"] =  this._securityService.session.token;
        payload["idMov"] = this.selectedMovement.idMov.toString();
        this._lorryService.confirmLorryMovement(payload)
            .subscribe(
            errors => {
                    this.errors = errors;
                    if (errors.length == 0) {
                        this.search();
                }},
                error => this.errorMessage = <any>error,
                () => this.close()
            );
    }

    /// Spinner
    stopRefreshing() {
        this.isRequesting = false;
    }


    /// modal methods
    close() {
        this.modal.close();
    }

    open() {
        this.modal.open('sm');
    }

}