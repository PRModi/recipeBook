import { Recipe } from './../../models/recipe.model';
import { RecipesService } from './../../services/recipes.service';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, ActionSheetController, AlertController, ToastController, NavController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";


@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {

  mode: string = 'New';
  selectOptions: string[] = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;
  recipe: Recipe;
  index: number;

  constructor(private navParams: NavParams,
    private asController: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private recipeService: RecipesService,
    private navCtrl: NavController) { }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    if (this.mode == 'Edit') {
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }
    this.initializeForm();

  }

  onSubmit() {
    const value = this.recipeForm.value;

    let ingredients = [];
    if (value.ingredients.length > 0) {
      ingredients = value.ingredients.map(name => {
        return { name: name, amount: 1 };
      });
    }
    if (this.mode == 'New') {
      this.recipeService.addRecipe(value.title, value.description, value.difficulty, ingredients);
    }
    else if(this.mode == 'Edit') {
      this.recipeService.updateRecipe(this.index,value.title,value.description,value.difficulty,ingredients);
    }

    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

  private initializeForm() {

    let title = null;
    let description = null;
    let difficulty = 'Medium';
    let ingredients = [];

    if (this.mode == 'Edit') {
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;

      for (let ingredient of this.recipe.ingredients) {
        ingredients.push(new FormControl(ingredient.name, Validators.required));
      }
    }



    this.recipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required),
      'ingredients': new FormArray(ingredients)
    });
  }

  private createNewIngredientAlert() {
    let alert = this.alertCtrl.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if (data.name.trim() == "" || data.name == null) {
              this.toastCtrl.create({
                message: 'Please add a valid value!',
                duration: 2000,
                position: "bottom"
              }).present();
              return;
            }
            (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));
          }
        }
      ]
    });
    alert.present()
  }

   onManageIngredients() {
    let actionSheet = this.asController.create({
      title: "What do you want to do ?",
      buttons: [
        {
          text: "Add Ingredient",
          role: "",
          handler: () => {
            this.createNewIngredientAlert();
          }
        },
        {
          text: 'Remove all Ingredient',
          role: 'destructive',
          handler: () => {
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            if (fArray.length > 0) {
              for (let i = fArray.length; i >= 0; i--) {
                fArray.removeAt(i);
              }
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { }
        }
      ],
    });
    actionSheet.present();
  }

}
