import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { RecipesStorageService } from "../shared/services/recipes-storage.service";
import { Observable } from "rxjs";

export const recipesResolverService: ResolveFn<Recipe[]> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] => {
        return inject(RecipesStorageService).fetchStorage();
    };
