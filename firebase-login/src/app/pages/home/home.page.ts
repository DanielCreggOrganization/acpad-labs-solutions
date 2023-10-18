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
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
