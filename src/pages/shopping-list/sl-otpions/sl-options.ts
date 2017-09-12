import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
    selector: 'page-slOptions',
    template: `
    <ion-grid text-center>
    <ion-row>
    <ion-col><h4>Load & Save</h4></ion-col>    
    </ion-row>
    
    <ion-row>
    <ion-col>
    <button ion-button outline (click)="onAction('load')">Load</button>
    </ion-col>
    </ion-row>

    <ion-row>
    <ion-col>
    <button ion-button outline (click)="onAction('save')">Save</button>
    </ion-col>
    </ion-row>

    </ion-grid>`
})
export class SLOptions {

    constructor(private viewCtrl: ViewController) {

    }


    onAction(action: string) {
        this.viewCtrl.dismiss({action: action});

    }

}