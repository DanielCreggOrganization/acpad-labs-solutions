import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  redirectUnauthorizedTo, // Used to redirect to login screen if user is not logged in.
  redirectLoggedInTo, // Used to redirect to home screen if user is already logged in.
  canActivate, // Used to protect routes by checking if user is logged in.
} from '@angular/fire/auth-guard';

// Define functions to redirect unauthorized and logged-in users to specific routes
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/']);
const redirectLoggedInToApp = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
    ...canActivate(redirectLoggedInToApp), // Automatically redirect to home page if user is logged in.
    // the spread operator ... is used to expand the properties of the object returned by the canActivate function into the route configuration object.
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
    ...canActivate(redirectUnauthorizedToLogin), // Automatically redirect to login page if user is not logged in.
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
