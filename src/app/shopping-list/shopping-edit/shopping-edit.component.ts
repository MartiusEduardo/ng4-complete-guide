import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/models/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', { static: false }) slForm: NgForm;
  ingredientSubscription: Subscription;
  editMode: boolean = false;
  editedModeId: number;
  editedIngredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredientSubscription = this.shoppingListService.startingEditIngredient.subscribe(
      (id: number) => {
        this.editedModeId = id;
        this.editMode = true;
        this.editedIngredient = this.shoppingListService.getIngredient(id);
        this.slForm.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount
        });
    });
  }

  onSubmit() {
    if(this.editMode) {
      this.shoppingListService.updateIngredient(this.editedModeId, this.adaptIngredient());
    } else {
      this.shoppingListService.addIngredient(this.adaptIngredient());
    }
    this.onResetForm();
  }

  adaptIngredient() {
    const ingName = this.slForm.value.name;
    const ingAmount = this.slForm.value.amount;
    return new Ingredient(ingName, ingAmount);
  }

  onRemoveIngredient() {
    this.shoppingListService.removeIngredient(this.editedModeId);
    this.onResetForm();
  }

  onResetForm() {
    this.slForm.reset();
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.ingredientSubscription.unsubscribe();
  }

}
