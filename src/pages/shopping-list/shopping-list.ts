import { AuthService } from './../../services/auth.service';
import { SLOptions } from './sl-otpions/sl-options';
import { Ingredient } from './../../models/ingredient.model';
import { ShoppingListService } from './../../services/shopping-list.service';
import { Component } from '@angular/core';
import { IonicPage, PopoverController, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from "@angular/forms/forms";

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  ingredients: Ingredient[];

  constructor(private slService: ShoppingListService,
    private popOverCtrl: PopoverController,
    private viewctrl: ViewController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) { }

  ionViewWillEnter() {
    this.loadItems();
  }

  onItemAdd(form: NgForm) {

    this.slService.addItem(new Ingredient(form.value.ingredientName, form.value.amount));
    form.reset();
    this.loadItems();

  }

  private loadItems() {
    this.ingredients = this.slService.getItems();
  }
  removeItem(i: number) {
    this.slService.removeItem(i);
    this.loadItems();
  }

  onShowOptions(event: MouseEvent) {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    const popOver = this.popOverCtrl.create(SLOptions);
    popOver.present({ ev: event });
    popOver.onDidDismiss(data => {
      if(!data){
        return;
      }
      if (data.action == 'load') {
        loading.present();
        this.authService.getActiveUser().getToken()
          .then((token: string) => {
            this.slService.fetchList(token).subscribe(
              (list: Ingredient[]) => {
                loading.dismiss();
                if (list) {
                  this.ingredients = list;
                }
                else {
                  this.ingredients = [];
                }
              },

              error => {
                loading.dismiss();
                this.handleError(error.message);
              }
            )
          })

      }
      else if (data.action == 'save') {
        loading.present();
        this.authService.getActiveUser().getToken()
          .then((token: string) => {
            this.slService.storeList(token).subscribe(
              () => loading.dismiss(),
              error => {
                loading.dismiss();
                this.handleError(error.message)
              }
            );

          }
          );


      }
    });
  }

  private handleError(errorMessage: string) {
    this.alertCtrl.create({
      title: 'An error occured!',
      message: errorMessage,
      buttons: ['OK']
    }).present

  }

}
