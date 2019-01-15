import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
// import { ConstructionsitePhotoEquipmentPage } from '../constructionsite-photo-equipment/constructionsite-photo-equipment';
import { ConstructionsiteEquipmentPage } from '../constructionsite-equipment/constructionsite-equipment';
// import { ConstructionsitePhotoSitePage } from '../constructionsite-photo-site/constructionsite-photo-site';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { CameraProvider } from '../../providers/camera/camera';
import { FileHandlerProvider } from '../../providers/file-handler/file-handler';
import { TimeProvider } from '../../providers/time/time';
import { ConstructionsiteProvider } from '../../providers/constructionsite/constructionsite';



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
		public consiteProv: ConstructionsiteProvider, 
		public cameraProvider: CameraProvider, 
		public timeProvider: TimeProvider,
		public fileHandler: FileHandlerProvider
	) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ConstructionsitePhotoPage');
	}

	openPhotoEquipmentPage(){
		this.navCtrl.push(ConstructionsiteEquipmentPage);
// 		this.presentCameraActionSheet();
	}

// 	openPhotoConsitePage(){
// 		this.presentCameraActionSheet();
// 	}

	public presentCameraActionSheet() {// {{{
		let actionSheet = this.actionSheetCtrl.create({
			title: 'Bildquelle auswaehlen:',
			buttons: [
				{
					text: 'Aus Galerie laden',
					handler: () => {
						this.cameraProvider.takePicture(this.cameraProvider.camera.PictureSourceType.PHOTOLIBRARY);
						this.handlePicture();
					}
				},
				{
					text: 'Kamera',
					handler: () => {
						this.cameraProvider.takePicture(this.cameraProvider.camera.PictureSourceType.CAMERA);
						this.handlePicture();
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

	handlePicture(){// {{{
		let photoStream$ = this.cameraProvider.photoStream
		.subscribe(imagePath => {
			console.log("IMAGE PATH:");
			console.log(imagePath);

			let path = imagePath[0];
			let fileName = imagePath[1];
			let ext = fileName.substring(fileName.lastIndexOf('.'));
			let newFileName = this.createNewFileName() + ext;
			this.fileHandler.copyFileToProjDir(path, fileName, newFileName);
			photoStream$.unsubscribe();
		},
		err => {
			console.log(JSON.stringify(err)); 
			photoStream$.unsubscribe();
		});
	}// }}}
	createNewFileName(){// {{{
		let newFileName:string = "consite_" + this.consiteProv.getConstructionsiteId() + "_" + this.timeProvider.getDateStrForFilename();
		return newFileName;
	}// }}}

}
