import { AuthService } from './auth.service';
import { Ingredient } from './../models/ingredient.model';
import { Http } from "@angular/http";
import 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class ShoppingListService {
    private ingredients: Ingredient[] = [];

    constructor(private http: Http,
        private authService: AuthService) {

    }

    getAllIngredients() {
        return this.ingredients;
    }

    addItem(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        console.log(this.ingredients);

    }

    addItems(items: Ingredient[]) {
        this.ingredients.push(...items);
    }

    getItems() {
        return this.ingredients.slice();
    }
    removeItem(index) {
        this.ingredients.splice(index, 1);
    }

    storeList(token: string) {
        const userId = this.authService.getActiveUser().uid;
        return this.http.put('https://ionic2-recipebook-c8a48.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token, this.ingredients)
            .map(response => {
                return response.json();
            });
    }

    fetchList(token: string) {
        const userId = this.authService.getActiveUser().uid;
        return this.http.get('https://ionic2-recipebook-c8a48.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token)
            .map(response => {
                return response.json();
            })
            .do(data => {
                this.ingredients = data;
            });

    }
}