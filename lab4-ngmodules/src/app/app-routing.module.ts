import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
      // Add path to standalone component. Any route can lazily load its routed, standalone component by using loadComponent:
      path: 'standalone',
      loadComponent: () => import('./standalone/standalone.component').then(mod => mod.StandaloneComponent)
  },
  {
    path: 'ngmodule',
    loadChildren: () => import('./ngmodule/ngmodule.module').then( m => m.NgmoduleModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    // Add path to notes module. Any route can lazily load its routed, feature module by using loadChildren:
    path: 'notes',
    loadChildren: () => import('./notes/notes.module').then( m => m.NotesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
