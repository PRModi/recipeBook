import { SLOptions } from './../pages/shopping-list/sl-otpions/sl-options';
import { AuthService } from './../services/auth.service';
import { SignupPage } from './../pages/signup/signup';
import { SigninPage } from './../pages/signin/signin';
import { RecipePage } from './../pages/recipe/recipe';
import { RecipesService } from './../services/recipes.service';
import { EditRecipePage } from './../pages/edit-recipe/edit-recipe';
import { ShoppingListService } from './../services/shopping-list.service';
import { RecepiesPage } from './../pages/recepies/recepies';
import { ShoppingListPage } from './../pages/shopping-list/shopping-list';
import { TabsPage } from './../pages/tabs/tabs';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    ShoppingListPage,
    RecepiesPage,
    EditRecipePage,
    RecipePage,
    SigninPage,
    SignupPage,
    SLOptions

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    ShoppingListPage,
    RecepiesPage,
    EditRecipePage,
    RecipePage,
    SigninPage,
    SignupPage,
    SLOptions
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ShoppingListService,
    RecipesService,
    AuthService    
  ]
})
export class AppModule { }
