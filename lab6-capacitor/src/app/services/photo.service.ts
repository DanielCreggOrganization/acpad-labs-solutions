import { Injectable } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
} from '@capacitor/camera';


@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  // Used to store a reference to each captured photo from the Camera using the Photo interface
  public photos: UserPhoto[] = [];

  constructor() {}

  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
  
    // Add the newly captured photo to the beginning of the photos array.
    this.photos.unshift({
      filepath: "soon...",
      webviewPath: capturedPhoto.webPath!
    });
  }
}

// Used to store the photo metadata
export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}