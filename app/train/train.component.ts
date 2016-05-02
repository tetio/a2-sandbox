import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import {ITrain} from './train';
import {TrainService} from './train.service';


@Component({
    selector: 'train-tab',
    templateUrl: 'app/train/train.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class TrainComponent {
    trains: ITrain[];
    errorMessage: string;

    constructor(private _trainService: TrainService) {}

    search() {
        this._trainService.getTrains()
        .subscribe(
            trains => this.trains = trains,
            error => this.errorMessage = <any>error);
    }
}