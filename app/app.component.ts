import { Component } from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import 'rxjs/Rx';   // Load all features
import { ROUTER_PROVIDERS, RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import {InputText,DataTable,Button,Dialog,Column,Header,Footer} from 'primeng/primeng';

import { ProductListComponent } from './products/product-list.component';
import { ProductService } from './products/product.service';
import { LorryService } from './lorry/lorry.service';
import { TrainService } from './train/train.service';
import { SecurityService } from './security/security.service';
import { WelcomeComponent } from './home/welcome.component';
import { ProductDetailComponent } from './products/product-detail.component';
import { LorryComponent } from './lorry/lorry.component'
import { TrainComponent } from './train/train.component'
import { Payload } from './payload/payload';


///
import {SlideMenu} from 'primeng/primeng';
import {Accordion} from 'primeng/primeng';
import {AccordionTab} from 'primeng/primeng';
import {Draggable,Droppable} from 'primeng/primeng';
import {Lightbox} from 'primeng/primeng';
import {Growl} from 'primeng/primeng';
import {Dropdown} from 'primeng/primeng';


@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    directives: [ROUTER_DIRECTIVES,
	SlideMenu,InputText,DataTable,Button,Dialog,Column,Header,Footer,Accordion,AccordionTab,Draggable,Droppable,Lightbox,Growl,Dropdown],
    providers: [LorryService,
		TrainService,
		SecurityService,
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
	lorryMode: boolean = true;
	trainMode: boolean = false;
	loggedIn: boolean = false;
	username: string;
	password: string;
	errorMessage: string;
	
	
	constructor(private _securityService: SecurityService) {}

	isLoggedIn(): boolean {
		return this.loggedIn;
	}
	isLorryMode() {
		return this.lorryMode;
	}
	isTrainMode() {
		return this.trainMode;
	}
	
	setLorryMode() {
		this.lorryMode = true;
		this.trainMode = false;
	}
	setTrainMode() {
		this.lorryMode = false;
		this.trainMode = true;
	}	
	
	login() {
		var payload = new Payload<string>();
        payload["username"] = this.username;
        payload["password"] = this.password;
		this._securityService.login(payload)
			.subscribe(
		// TODO: Check with secutity service
				session => {
					if (session.codiError >= 0 && session.token) {
						this.loggedIn = true;
						this._securityService.session = session;
					} else {
						// TODO avisar que no s'ha autenticat correctament
					}
				},
				error => this.errorMessage = error
			);
	}
}