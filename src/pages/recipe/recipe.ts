import { RecipesService } from './../../services/recipes.service';
import { ShoppingListService } from './../../services/shopping-list.service';
import { EditRecipePage } from './../edit-recipe/edit-recipe';
import { Recipe } from './../../models/recipe.model';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {
  recipe: Recipe;
  index: number;

  ngOnInit() {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
    console.log(this.recipe);
    console.log(this.index);
  }

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private slService: ShoppingListService,
    private recipeService: RecipesService,
    public toastController: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');
  }
  onEditRecipe() {
    this.navCtrl.push(EditRecipePage, { mode: "Edit", recipe: this.recipe, index: this.index });
  }

  onDeleteRecipe() {
    this.recipeService.removeRecipe(this.index);
    this.navCtrl.popToRoot();
    this.toastController.create({
      message: 'Recipe Deleted!',
      duration: 2000
    }).present();
  }

  onAddIngredients() {
    this.slService.addItems(this.recipe.ingredients);
    this.toastController.create({
      message: 'Ingredients added to Shopping list',
      duration: 2000,
      position: 'bottom'
    }).present();
    this.navCtrl.popToRoot();
  }

}
