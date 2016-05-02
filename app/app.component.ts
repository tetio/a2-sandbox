import { Component } from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import 'rxjs/Rx';   // Load all features
import { ROUTER_PROVIDERS, RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { ProductListComponent } from './products/product-list.component';
import { ProductService } from './products/product.service';
import { LorryService } from './lorry/lorry.service';
import { TrainService } from './train/train.service';
import { WelcomeComponent } from './home/welcome.component';
import { ProductDetailComponent } from './products/product-detail.component';
import { LorryComponent } from './lorry/lorry.component'
import { TrainComponent } from './train/train.component'


@Component({
    selector: 'pm-app',
    templateUrl: 'app/app.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [LorryService,
		TrainService,
        HTTP_PROVIDERS,
        ROUTER_PROVIDERS]
})
@RouteConfig([
    { path: '/lorry', name: 'Lorry', component: LorryComponent, useAsDefault: true },
    { path: '/train', name: 'Train', component: TrainComponent }
])
export class AppComponent {
    pageTitle: string = 'Gestión de entradas y salidas';
	public menuItems = [
		{ caption: 'TREN', link: ['Train'] },
		{ caption: 'CAMIÓN', link: ['Lorry'] }
	];


	isLorryMode() {
		return false;
	}
	idTrainMode() {
		return true;
	}
}