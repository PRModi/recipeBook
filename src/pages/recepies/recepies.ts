import { RecipePage } from './../recipe/recipe';
import { RecipesService } from './../../services/recipes.service';
import { Recipe } from './../../models/recipe.model';
import { EditRecipePage } from './../edit-recipe/edit-recipe';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-recepies',
  templateUrl: 'recepies.html',
})
export class RecepiesPage {
  recipes: Recipe[] = [];
  constructor(private navCtrl: NavController, private recipeService: RecipesService) { }

  ionViewWillEnter() {
    this.recipes = this.recipeService.getRecipes();
  }
  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, { mode: 'New' });
  }
  onLoadRecipe(recipe: Recipe, index: number) {
    this.navCtrl.push(RecipePage, { recipe : recipe, index : index })
  }
}
