import { Component, ViewChild } from 'angular2/core';
import {MODAL_DIRECTIVES, ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal'

@Component({
    selector: 'welcome-component',
    directives: [MODAL_DIRECTIVES],
    templateUrl: 'app/home/welcome.component.html'
})
export class WelcomeComponent {
    @ViewChild('welcomeModal')
    modal: ModalComponent
    pot: String = "Pet pet pet";
    
    public pageTitle: string = "Welcome";
    
    close() {
        this.modal.close();
    }
    
    open() {
        this.modal.open('lg');
    }
    
}