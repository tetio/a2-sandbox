import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import { Config } from "../config/config"
import { Payload } from '../payload/payload';
import { Service } from '../payload/service';
import { ILorryMovement } from './lorryMovement'

@Injectable()
export class LorryService extends Service {
    //private _lorryMovementsUrl = 'api/lorry/lorry-list.json'
    //private _lorryMovementConfirmationsUrl = 'api/lorry/lorry-confirmation.json'
    private _lorryMovementsUrl = Config.getEnvironmentVariable('endPoint') + '/webTermint/api/lorryQuery';
    private _lorryMovementConfirmationsUrl = Config.getEnvironmentVariable('endPoint') + '/webTermint/api/lorryConfirmation';
    private _craneMovementConfirmationsUrl = Config.getEnvironmentVariable('endPoint') + '/webTermint/api/craneConfirmation';

    constructor( _http: Http) { 
        super(_http);
    }

    getLorryMovements(payload): Observable<ILorryMovement[]> {
        let queryString = this.generateQueryString(payload);

        return this._http.get(this._lorryMovementsUrl + queryString)
            .map((response: Response) => <ILorryMovement[]>response.json())
            .catch(this.handleError)
    }

    confirmLorryMovement(payload): Observable<string[]> {
        return this._http.post(this._lorryMovementConfirmationsUrl, JSON.stringify(payload))
            .map((response: Response) => <string[]>response.json())
            .catch(this.handleError)
    }

    confirmCraneMovement(payload): Observable<string[]> {
        return this._http.post(this._craneMovementConfirmationsUrl, JSON.stringify(payload))
            .map((response: Response) => <string[]>response.json())
            .catch(this.handleError)
    }

}