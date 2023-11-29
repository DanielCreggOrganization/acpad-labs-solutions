import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  constructor(public photoService: PhotoService) {}

  async ngOnInit() {
    // Retrieve cached photo array data
    await this.photoService.loadSaved();
  }

  addPhotoToGallery() {
    // Call the takePicture method from the photoService service
    this.photoService.addNewToGallery();
  }
}
