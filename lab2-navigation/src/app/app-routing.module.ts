import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsComponent } from './tabs/tabs.component';

const routes: Routes = [
  {
    // The first route in the configuration is the default route. 
    // This is the route that your app will navigate to when the user first visits your app.
    // The default route in this case is the TabsComponent.
    path: '',
    component: TabsComponent,
    // The children property of the TabsComponent route defines the pages that the tabs correspond to. 
    // In this case, the tabs correspond to the HomePageModule and the TestPagePageModule.
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'products',
        loadChildren: () => import('./products/products.module').then( m => m.ProductsPageModule)
      },
      {
        path: 'products/:text',
        loadChildren: () => import('./products/products.module').then( m => m.ProductsPageModule)
      },
    ],
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then( m => m.ProductsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
