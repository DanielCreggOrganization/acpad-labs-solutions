import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  text: string = '';
  constructor(private router: Router) { }

  // Push the 'About' page onto the navigation stack
  pushProductsPageOnToStack() {
    this.router.navigate(['/products']);
  }

}

