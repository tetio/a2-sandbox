import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

import { Config } from "../config/config"
import { Payload } from '../payload/payload';
import { Service } from '../payload/service';
import {ITrainServicesResponse, ITrain} from './train'

@Injectable()
export class TrainService {
    private _trainServicesUrl = Config.getEnvironmentVariable('endPoint') + '/webTermint/api/trainServicesQuery';
    private _trainMovementsUrl = 'api/train/train-list.json'
    private _trainMovementConfirmationsUrl = 'api/train/train-confirmation.json'
    private _lorryMovementsUrl = Config.getEnvironmentVariable('endPoint') + '/webTermint/api/trainQuery';

    constructor(private _http: Http) {}


    getTrainServices(payload) : Observable<ITrainServicesResponse> {
        return this._http.post(this._trainServicesUrl, JSON.stringify(payload))
            .map((response: Response) => <ITrainServicesResponse>response.json())
            .catch(this.handleError)
    }

    getTrains(payload) : Observable<ITrain[]> {
        return this._http.post(this._trainMovementsUrl, JSON.stringify(payload))
            .map((response: Response) => <ITrain[]>response.json())
            .catch(this.handleError)
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}