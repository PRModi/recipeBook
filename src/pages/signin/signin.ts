import { AuthService } from './../../services/auth.service';
import { NgForm } from '@angular/forms/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  constructor(private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) { }

  onSignin(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signing in...'
    });
    loading.present();

    this.authService.signin(form.value.email, form.value.password)
      .then(data => {
        loading.dismiss();
        this.alertCtrl.create({
          title: 'Signed in',

          buttons: ['Ok']
        }).present();
      })
      .catch(error => {
        loading.dismiss();
        this.alertCtrl.create({
          title: 'Signed in failed!',
          message: error.message,
          buttons: ['Ok']
        }).present();
      })

  }
}
