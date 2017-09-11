import { NavParams, NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';


@Component({
    selector : 'page-user',
    templateUrl : 'user.html'
})
export class UserPage implements OnInit {
    ngOnInit() {
       this.name = this.navParams.get('username');
    }

    name : string ;

     constructor( private navParams : NavParams , private navCtrl : NavController){}

     backToHome(){
         this.navCtrl.popToRoot();
     }


}