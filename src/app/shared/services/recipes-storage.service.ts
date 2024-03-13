import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../../recipes/recipe.service";
import { Recipe } from "../../recipes/recipe.model";
import { AuthService } from "../../auth/auth.service";
import { map, tap } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class RecipesStorageService {

    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

    saveStorage() {
        const recipes = this.recipeService.getRecipes();
        // return this.authService.user.pipe(take(1), exhaustMap(user => {
        //     return this.http.put('https://ng4-complete-guide-c3220-default-rtdb.firebaseio.com/recipes.json', recipes, {
        //         params: new HttpParams().set('auth', user.token)
        //     });
        // })).subscribe(response => {
        //     console.log(response);
        // });
        
        //Utilizando o Auth Interceptor para validar usuário. 
        //Por isso não há necessidade de incluir o params como no código acima.
        return this.http.put('https://ng4-complete-guide-c3220-default-rtdb.firebaseio.com/recipes.json', recipes,).subscribe();
        
    }

    fetchStorage() {
        // return this.authService.user.pipe(take(1), exhaustMap(user => {
        //     return this.http.get<Recipe[]>('https://ng4-complete-guide-c3220-default-rtdb.firebaseio.com/recipes.json', {
        //         params: new HttpParams().set('auth', user.token)
        //     });
        // }), map(recipes => {
        //     return recipes.map(recipe => {
        //         return <Recipe>{...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        //     });
        // }), tap(recipes => {
        //     this.recipeService.setRecipes(recipes);
        // }));

        //Utilizando o Auth Interceptor para validar usuário. 
        //Por isso não há necessidade de incluir o params como no código acima.
        return this.http.get<Recipe[]>('https://ng4-complete-guide-c3220-default-rtdb.firebaseio.com/recipes.json')
            .pipe(map(recipes => {
                return recipes.map(recipe => {
                    return <Recipe>{...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
                });
            }), tap(recipes => {
                this.recipeService.setRecipes(recipes);
            }));
    }
}