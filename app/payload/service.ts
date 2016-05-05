import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import { Payload } from './payload'

export class Service {

    constructor(protected _http: Http) { }

    generateQueryString(payload: Payload<string>): string {
        var qs = "";
        var prefix = "?";
        for (var key in payload) {
            qs += prefix + key + "=" + payload[key];
            if (prefix == '?') {
                prefix = '&';
            }
        }
        return qs;
    }

    protected handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}