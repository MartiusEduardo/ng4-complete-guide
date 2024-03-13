import { Injectable, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService implements OnInit {

  // private recipes: Recipe[] = [
  //   new Recipe('A Test Recipe', 'This is a simple test', 
  //     'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',
  //     [
  //       new Ingredient('Mozarella', 10),
  //       new Ingredient('Gnocchi', 1)
  //     ]),
  //   new Recipe('A Test Recipe 2', 'This is a simple test 2', 
  //     'https://www.southernliving.com/thmb/HSEUOjJVCl4kIRJRMAZ1eblQlWE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Millionaire_Spaghetti_019-34e9c04b1ae8405088f53450a048e413.jpg',
  //     [
  //       new Ingredient('Tomatoes', 5),
  //       new Ingredient('Mozarella', 3)
  //     ])
  // ]
  private recipes: Recipe[];

  recipesChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    // return this.recipes.find((recipe: Recipe) => recipe.id === id);
    return this.recipes.slice()[id];
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) { 
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(id: number, recipe: Recipe) {
    this.recipes[id] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
