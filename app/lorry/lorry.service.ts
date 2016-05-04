import {Injectable} from 'angular2/core';
import {ILorryMovement} from './lorryMovement'
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Jsonp, URLSearchParams} from '@angular/http';
@Injectable()
export class LorryService {
    private _lorryMovementsUrl = 'api/lorry/lorry-list.json'
    private _lorryMovementConfirmationsUrl = 'api/lorry/lorry-confirmation.json'
    
    
    constructor(private _http: Http) {}
    
    getLorryMovements(payload) : Observable<ILorryMovement[]> {
        let queryString = this.generateQueryString(payload);
        
        return this._http.get(this._lorryMovementsUrl)
            .map((response: Response) => <ILorryMovement[]>response.json())
            .catch(this.handleError)
    }

    postLorryMovements(payload) : Observable<ILorryMovement[]> {
        return this._http.post(this._lorryMovementsUrl, JSON.stringify(payload))
            .map((response: Response) => <ILorryMovement[]>response.json())
            .catch(this.handleError)
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
    
    
    generateQueryString(payload): string {
        return "?tipoSelect="+payload.typeSelect
        + "contenedor=" + payload.contenedor
        + "paisSessio=" + payload.paisSessio
        + "nifSessio=" + payload.nifSessio
        + "usuariSessio=" + payload.usuariSessio
        + "token=" + payload.token
    }        
}