import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // <-- import IonicModule

import { NgmoduleRoutingModule } from './ngmodule-routing.module';
import { NgmoduleComponent } from './ngmodule.component'; // <-- import NgmoduleComponent


@NgModule({
  declarations: [NgmoduleComponent], // <-- declare NgmoduleComponent
  imports: [
    CommonModule,
    NgmoduleRoutingModule,
    IonicModule // <-- add IonicModule
  ]
})
export class NgmoduleModule { }
