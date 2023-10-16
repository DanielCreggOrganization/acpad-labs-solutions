import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgmoduleComponent } from './ngmodule.component';


import { NgmoduleRoutingModule } from './ngmodule-routing.module';



@NgModule({
  declarations: [NgmoduleComponent],
  imports: [
    CommonModule,
    NgmoduleRoutingModule,
    IonicModule
  ]
})
export class NgmoduleModule { }
