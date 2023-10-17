import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // <-- add IonicModule needed for button
import { RouterModule } from '@angular/router'; // <-- add RouterModule needed for navigation

@Component({
  selector: 'app-standalone',
  templateUrl: './standalone.component.html',
  styleUrls: ['./standalone.component.scss'],
  standalone: true, // <-- add standalone: true
  imports: [IonicModule, RouterModule] // <-- Import IonicModule and RouterModule
})
export class StandaloneComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
