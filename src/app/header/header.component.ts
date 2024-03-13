import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipesStorageService } from '../shared/services/recipes-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  hCollapsed: boolean = false;
  userSub: Subscription;
  isAuthenticated: boolean = false;

  constructor(private recipesStorageService: RecipesStorageService, private authService: AuthService) {}

  ngOnInit(): void {
      this.userSub = this.authService.user.subscribe(user => {
        this.isAuthenticated = !!user;
      });
  }

  onSaveData() {
    this.recipesStorageService.saveStorage();
  }

  onFetchData() {
    this.recipesStorageService.fetchStorage().subscribe();
  }

  onLogout() {
    this.authService.logout();
    this.isAuthenticated = false;
  }

  ngOnDestroy(): void {
      this.userSub.unsubscribe();
  }

  onDropdown() {
    this.hCollapsed = !this.hCollapsed;
    console.log(this.hCollapsed);
  }

}
