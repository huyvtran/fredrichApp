import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController} from 'ionic-angular';

import { ConstructionsiteProvider } from '../../providers/constructionsite/constructionsite';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { CameraProvider } from '../../providers/camera/camera';
import { TimeProvider } from '../../providers/time/time';
import { FileHandlerProvider } from '../../providers/file-handler/file-handler';
import { QrScannerProvider } from '../../providers/qr-scanner/qr-scanner';

import { ConstructionsiteEquipmentDetailPage } from '../../pages/constructionsite-equipment-detail/constructionsite-equipment-detail';

/**
 * Generated class for the ConstructionsiteEquipmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-constructionsite-equipment',
  templateUrl: 'constructionsite-equipment.html',
})
export class ConstructionsiteEquipmentPage {

	constructor(public navCtrl: NavController, 
		public navParams: NavParams, 
		public consiteProv: ConstructionsiteProvider, 
		private auth: AuthServiceProvider, 
		public actionSheetCtrl: ActionSheetController, 
		public cameraProvider: CameraProvider,
		public timeProvider: TimeProvider,
		public fileHandler: FileHandlerProvider,
		public qrScannerProvider: QrScannerProvider
	) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstructionsiteEquipmentPage');
  }

	itemSelected(item){// {{{
		this.navCtrl.push(ConstructionsiteEquipmentDetailPage, {item: item});
	}// }}}

	presentCameraActionSheet(item) {// {{{
		let actionSheet = this.actionSheetCtrl.create({
			title: 'Bildquelle auswaehlen:',
			buttons: [
				{
					text: 'Aus Galerie laden',
					handler: () => {
						this.cameraProvider.takePicture(this.cameraProvider.camera.PictureSourceType.PHOTOLIBRARY);
						this.handlePicture(item);
					}
				},
				{
					text: 'Kamera',
					handler: () => {
						this.cameraProvider.takePicture(this.cameraProvider.camera.PictureSourceType.CAMERA);
						this.handlePicture(item);
// 						this.event.imageFiles.push("image" + this.event.imageFiles.length);
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
	handlePicture(item){// {{{
		let photoStream$ = this.cameraProvider.photoStream
		.subscribe(imagePath => {
			console.log("IMAGE PATH:");
			console.log(imagePath);

			let path = imagePath[0];
			let fileName = imagePath[1];
			let ext = fileName.substring(fileName.lastIndexOf('.'));
			let newFileName = this.createNewFileName(item) + ext;

			this.fileHandler.copyFileToProjDir(path, fileName, newFileName);

			photoStream$.unsubscribe();
		},
		err => {
			console.log(JSON.stringify(err)); 
			photoStream$.unsubscribe();
		});
	}// }}}
	createNewFileName(item){// {{{
		let newFileName:string = "item_" + item.getId() + "_" + this.timeProvider.getDateStrForFilename();
		return newFileName;
	}// }}}

	scan(){
		this.qrScannerProvider.scanEquipment()
			.then(item => {
				this.openEquipmentDetailPage(item);
			})
			.catch(err => {
				console.log(JSON.stringify(err));
			});
	}

	openEquipmentDetailPage(item){
		this.navCtrl.push(ConstructionsiteEquipmentDetailPage, {item: item});
	}
}
