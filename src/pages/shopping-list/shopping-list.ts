import { Ingredient } from './../../models/ingredient.model';
import { ShoppingListService } from './../../services/shopping-list.service';
import { Component, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NgForm } from "@angular/forms/forms";

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  ingredients: Ingredient[];

  constructor(private slService: ShoppingListService) { }

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

}
