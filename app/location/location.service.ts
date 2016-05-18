import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

import { Config } from "../config/config"
import { Payload } from '../payload/payload';
import { Service } from '../payload/service';
import { ILocation, ILocationsResponse } from './location.ts'

@Injectable()
export class LocationService extends Service {
    private _LocationServicesUrl = Config.getEnvironmentVariable('endPoint') + '/webTermint/api/ubicacion';
    locations: ILocation[] = [];

    constructor(_http: Http) {
        super(_http);
    }

    getLocations(payload) : Observable<ILocationsResponse> {
        return this._http.post(this._LocationServicesUrl, JSON.stringify(payload))
            .map((response: Response) => <ILocationsResponse>response.json())
            .catch(this.handleError)
    }
}