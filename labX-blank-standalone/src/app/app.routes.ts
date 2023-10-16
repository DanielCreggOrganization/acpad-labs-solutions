import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'standalone',
      loadComponent: () => import('./standalone/standalone.component').then(mod => mod.StandaloneComponent)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
