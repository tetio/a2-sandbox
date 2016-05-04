import {Injectable} from 'angular2/core';
import {ILorryMovement} from './lorryMovement'
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Jsonp, URLSearchParams} from '@angular/http';
import { Config } from "../config/config"
import { Payload } from '../payload/payload';


@Injectable()
export class LorryService {
    //private _lorryMovementsUrl = 'api/lorry/lorry-list.json'
    private _lorryMovementsUrl = Config.getEnvironmentVariable('endPoint') + '/webTermint/api/lorryQuery'
    private _lorryMovementConfirmationsUrl = 'api/lorry/lorry-confirmation.json'


    constructor(private _http: Http) { }

    getLorryMovements(payload): Observable<ILorryMovement[]> {
        let queryString = this.generateQueryString(payload);

        return this._http.get(this._lorryMovementsUrl + queryString)
            .map((response: Response) => <ILorryMovement[]>response.json())
            .catch(this.handleError)
    }

    postLorryMovements(payload): Observable<ILorryMovement[]> {
        return this._http.post(this._lorryMovementsUrl, JSON.stringify(payload))
            .map((response: Response) => <ILorryMovement[]>response.json())
            .catch(this.handleError)
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }


    generateQueryString(payload: Payload<string>): string {
        var qs = "";
        var prefix = "?";
        for (var key in payload) {
            qs += prefix + key + "=" + payload[key];
            prefix = "&"
        }
        // var qs = "?";
        // if (payload.tipoSelect) {
        //     qs += "tipoSelect=" + payload.tipoSelect            
        // }
        // if (payload.contenedor) {
        //     qs += "&contenedor=" + payload.contenedor            
        // }
        // if (payload.paisSessio) {
        //     qs += "&paisSessio=" + payload.paisSessio            
        // }
        // if (payload.nifSessio) {
        //     qs += "&nifSessio=" + payload.nifSessio            
        // }
        // if (payload.usuariSessio) {
        //     qs += "&usuariSessio=" + payload.usuariSessio            
        // }
        // if (payload.token) {
        //     qs += "&token=" + payload.token            
        // }
        return qs;
    }
}