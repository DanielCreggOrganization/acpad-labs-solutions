import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { StandaloneComponent } from './standalone/standalone.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'ngmodule',
    // component: NgmoduleComponent,
    loadChildren: () => import('./ngmodule/ngmodule.module').then( m => m.NgmoduleModule)
  },
  // add path to standalone component. components cannot be lazy-loaded directly because they need to be declared in an Angular module
  {
    path: 'standalone',
    component: StandaloneComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
