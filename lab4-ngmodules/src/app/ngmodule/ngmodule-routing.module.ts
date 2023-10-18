import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgmoduleComponent } from './ngmodule.component';

const routes: Routes = [
  {
    path: '',
    component: NgmoduleComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NgmoduleRoutingModule { }
