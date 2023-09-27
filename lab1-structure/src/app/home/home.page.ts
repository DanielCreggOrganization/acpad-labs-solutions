import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private alertController: AlertController, private navCtrl: NavController) { }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Hello!',
      message: 'This is an alert!',
      buttons: ['OK']
    });

    await alert.present();
  }

  goToAbout() {
    this.navCtrl.navigateForward('/about');
  }

}