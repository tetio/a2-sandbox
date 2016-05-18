import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

import { Config } from "../config/config"
import { Payload } from '../payload/payload';
import { Service } from '../payload/service';
import {ILocation} from './location.ts'

@Injectable()
export class LocationService extends Service {
    private _LocationServicesUrl = Config.getEnvironmentVariable('endPoint') + '/webTermint/api/ubicacion';

    locations: ILocation[];
    selectedLocation: ILocation;

    constructor(_http: Http) {
        super(_http);
    }

    getLocations(payload) : Observable<ILocation[]> {
        return this._http.post(this._LocationServicesUrl, JSON.stringify(payload))
            .map((response: Response) => <ILocation[]>response.json())
            .catch(this.handleError)
    }
}