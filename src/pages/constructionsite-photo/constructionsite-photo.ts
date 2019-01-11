import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { ConstructionsitePhotoEquipmentPage } from '../constructionsite-photo-equipment/constructionsite-photo-equipment';
// import { ConstructionsitePhotoSitePage } from '../constructionsite-photo-site/constructionsite-photo-site';
import { CameraViewPage } from '../camera-view/camera-view';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { CameraProvider } from '../../providers/camera/camera';


/**
 * Generated class for the ConstructionsitePhotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-constructionsite-photo',
  templateUrl: 'constructionsite-photo.html',
})
export class ConstructionsitePhotoPage {

	constructor(public navCtrl: NavController, public navParams: NavParams,
		private actionSheetCtrl: ActionSheetController, 
		private auth: AuthServiceProvider, 
		public cameraProvider: CameraProvider) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ConstructionsitePhotoPage');
	}

	openPhotoEquipmentPage(){
// 		this.navCtrl.push(ConstructionsitePhotoEquipmentPage);
		this.presentCameraActionSheet();
	}

	openPhotoSitePage(){
		//set options
// 		this.navCtrl.push(CameraViewPage);
		this.presentCameraActionSheet();
	}

	public presentCameraActionSheet() {// {{{
		let actionSheet = this.actionSheetCtrl.create({
			title: 'Bildquelle auswaehlen:',
			buttons: [
				{
					text: 'Aus Galerie laden',
					handler: () => {
						this.cameraProvider.takePicture(this.cameraProvider.camera.PictureSourceType.PHOTOLIBRARY);
// 						this.addPictureToEvent();
					}
				},
				{
					text: 'Kamera',
					handler: () => {
						this.cameraProvider.takePicture(this.cameraProvider.camera.PictureSourceType.CAMERA);
// 						this.addPictureToEvent();
					}
				},
				{
					text: 'Abbrechen',
					role: 'cancel'
				}
			]
		});
		actionSheet.present();
	}// }}}



}
