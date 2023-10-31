import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'fir-ionic-project-dc52e',
        appId: '1:769063383414:web:0b402d09efd31d324dca57',
        storageBucket: 'fir-ionic-project-dc52e.appspot.com',
        apiKey: 'AIzaSyDibno0p2mUnQmjN6RlfXlHjbguzSIUjFY',
        authDomain: 'fir-ionic-project-dc52e.firebaseapp.com',
        messagingSenderId: '769063383414',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
