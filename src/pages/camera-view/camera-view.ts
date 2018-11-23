import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController, LoadingController, Loading } from 'ionic-angular';
import { CameraProvider } from '../../providers/camera/camera';


/**
 * Generated class for the CameraViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-camera-view',
  templateUrl: 'camera-view.html',
})
export class CameraViewPage {

	constructor(public navCtrl: NavController, public navParams: NavParams, public cameraProvider: CameraProvider, private actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraViewPage');
  }

	ionViewDidEnter() {

	}

	ionViewDidLeave() {
	}

	public presentActionSheet() {
		let actionSheet = this.actionSheetCtrl.create({
			title: 'Select Image Source',
			buttons: [
				{
					text: 'Load from Library',
					handler: () => {
					this.cameraProvider.takePicture(this.cameraProvider.camera.PictureSourceType.PHOTOLIBRARY);
					}
				},
				{
					text: 'Use Camera',
					handler: () => {
					this.cameraProvider.takePicture(this.cameraProvider.camera.PictureSourceType.CAMERA);
					}
				},
				{
					text: 'Cancel',
					role: 'cancel'
				}
			]
		});
		actionSheet.present();
	}

}
