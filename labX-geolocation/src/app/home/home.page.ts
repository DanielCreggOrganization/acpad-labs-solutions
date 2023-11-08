import { Component } from '@angular/core';
import { Geolocation }  from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  coordinates: any;

  async locateMe() {
    const position = await Geolocation.getCurrentPosition();
    this.coordinates = position.coords;
  }
}