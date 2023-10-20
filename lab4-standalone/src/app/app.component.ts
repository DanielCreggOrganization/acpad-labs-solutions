import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-root',
  template: `
  <ion-content>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Basic Ionic Standalone App
        </ion-title>
      </ion-toolbar>
    </ion-header>
  </ion-content>
`,
  standalone: true,
  imports: [IonicModule]
})
export class AppComponent {
  constructor() { }
}
