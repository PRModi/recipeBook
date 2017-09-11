import { AuthService } from './../services/auth.service';
import { SignupPage } from './../pages/signup/signup';
import { SigninPage } from './../pages/signin/signin';
import { RecipePage } from './../pages/recipe/recipe';
import { TabsPage } from './../pages/tabs/tabs';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from "firebase";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tabsPage: any = TabsPage;
  signinPage = SigninPage;
  signupPage = SignupPage;
  @ViewChild('nav') nav: NavController;
  isAuthenticated: boolean = false;



  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController, private authService: AuthService) {

    firebase.initializeApp({
      apiKey: "AIzaSyAYLjT3nQgPIP9KAi0T-iIWaRKkOWoUGfI",
      authDomain: "ionic2-recipebook-c8a48.firebaseapp.com",
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isAuthenticated = true;
        this.nav.setRoot(this.tabsPage);
      }
      else {
        this.isAuthenticated = false;
        this.nav.setRoot(this.signinPage);
      }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {
    this.authService.logout();
    this.menuCtrl.close();
  }

}

