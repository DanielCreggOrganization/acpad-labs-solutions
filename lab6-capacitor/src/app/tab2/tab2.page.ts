import { Component } from '@angular/core';
import { UserPhoto, PhotoService } from '../services/photo.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  constructor(
    public photoService: PhotoService,
    public actionSheetController: ActionSheetController
  ) {}

  async ngOnInit() {
    // Load saved photos when user click on tab 2
    await this.photoService.loadSaved();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  // Method to show an action sheet with options for a photo
  public async showActionSheet(photo: UserPhoto, position: number) {
    // Create the action sheet
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            // Delete the photo when the "Delete" button is clicked
            this.photoService.deletePicture(photo, position);
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            // Close the action sheet when the "Cancel" button is clicked
          },
        },
      ],
    });
    // Present the action sheet
    await actionSheet.present();
  }
}
