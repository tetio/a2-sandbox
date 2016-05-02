import {Injectable} from 'angular2/core';
import {ILorryMovement} from './lorryMovement'
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LorryService {
    private _lorryMovementsUrl = 'api/lorry/lorry-list.json'
    private _lorryMovementConfirmationsUrl = 'api/lorry/lorry-confirmation.json'
    
    
    constructor(private _http: Http) {}
    
    getLorryMovements(payload) : Observable<ILorryMovement[]> {
        return this._http.post(this._lorryMovementsUrl, JSON.stringify(payload))
            .map((response: Response) => <ILorryMovement[]>response.json())
            .catch(this.handleError)
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }        
}