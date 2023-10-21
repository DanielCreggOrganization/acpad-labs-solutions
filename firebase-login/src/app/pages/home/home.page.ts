import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private authService: AuthService, private router: Router) {}

  async logout() {
    this.authService.logout();
    // When logout, redirect to login page. 
    // Replace the current page in the history stack so that the user won't be able to go back to the home page after logout.
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
