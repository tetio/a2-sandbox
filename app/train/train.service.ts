import {Injectable} from 'angular2/core';
import {ITrain} from './train'
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TrainService {
    private _trainMovementsUrl = 'api/train/train-list.json'
    private _trainMovementConfirmationsUrl = 'api/train/train-confirmation.json'


    constructor(private _http: Http) {}

    getTrains() : Observable<ITrain[]> {
        return this._http.get(this._trainMovementsUrl)
            .map((response: Response) => <ITrain[]>response.json())
            .catch(this.handleError)
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}