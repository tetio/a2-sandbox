import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

import { Config } from "../config/config"
import { Payload } from '../payload/payload';
import { Service } from '../payload/service';
import {ITrainServicesResponse, ITrain, ITrainEquipsResponse} from './train'

@Injectable()
export class TrainService extends Service {
    private _trainServicesUrl = Config.getEnvironmentVariable('endPoint') + '/webTermint/api/trainServicesQuery';
    //private _trainsTESTUrl = 'api/train/train-list.json';
    private _trainsUrl = Config.getEnvironmentVariable('endPoint') + '/webTermint/api/trainQuery';   
    private _trainEquipsUrl = Config.getEnvironmentVariable('endPoint') + '/webTermint/api/trainEquipQuery';
    private _trainMovementConfirmationsUrl = Config.getEnvironmentVariable('endPoint') + '/webTermint/api/train...';
    private _lorryMovementsUrl = Config.getEnvironmentVariable('endPoint') + '/webTermint/api/trainQuery';

    selectedTrain: ITrain;

    constructor(_http: Http) {
        super(_http);
    }

    getTrainServices(payload) : Observable<ITrainServicesResponse> {
        return this._http.post(this._trainServicesUrl, JSON.stringify(payload))
            .map((response: Response) => <ITrainServicesResponse>response.json())
            .catch(this.handleError)
    }

    getTrains(payload) : Observable<ITrain[]> {
        return this._http.post(this._trainsUrl, JSON.stringify(payload))
            .map((response: Response) => <ITrain[]>response.json())
            .catch(this.handleError)
    }

    getTrainEquips(payload) : Observable<ITrainEquipsResponse> {
        return this._http.post(this._trainEquipsUrl, JSON.stringify(payload))
            .map((response: Response) => <ITrainEquipsResponse>response.json())
            .catch(this.handleError)
    }
}