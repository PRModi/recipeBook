import { Ingredient } from './../models/ingredient.model';
export class ShoppingListService {
    private ingredients: Ingredient[] = [];

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
}