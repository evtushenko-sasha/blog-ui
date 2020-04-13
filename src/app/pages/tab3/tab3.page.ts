import {Component} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {Camera, CameraOptions, PictureSourceType} from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  profileImage;

  constructor(private alertController: AlertController,
              private camera: Camera) {
  }

  async selectImageSource() {
    const alert = await this.alertController.create({
      header: 'Select Source',
      message: 'Pick a source for your image',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.setPictureBySourceTypeName(PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Gallery',
          handler: () => {
            this.setPictureBySourceTypeName(PictureSourceType.PHOTOLIBRARY);
          }
        }
      ]
    });
    await alert.present();
  }

  async setPictureBySourceTypeName(pictureSourceType: PictureSourceType) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 200,
      correctOrientation: true,
      sourceType: pictureSourceType
    };
    this.camera.getPicture(options)
      .then((image) => {
        this.profileImage = 'data:image/jpeg;base64,' + image;
        //  TODO: send put request to update photo by userDetails
      });
  }
}
