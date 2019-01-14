import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController} from 'ionic-angular';

import { ConstructionsiteProvider } from '../../providers/constructionsite/constructionsite';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { CameraProvider } from '../../providers/camera/camera';
import { TimeProvider } from '../../providers/time/time';
import { FileHandlerProvider } from '../../providers/file-handler/file-handler';
import { File } from '@ionic-native/file';


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
		public file: File
	) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstructionsiteEquipmentPage');
  }

	itemSelected(equipment){

	}

	takePicture(item){
		this.presentCameraActionSheet(item);
	}

	public presentCameraActionSheet(item) {// {{{
		let actionSheet = this.actionSheetCtrl.create({
			title: 'Bildquelle auswaehlen:',
			buttons: [
				{
					text: 'Aus Galerie laden',
					handler: () => {
						this.cameraProvider.takePicture(this.cameraProvider.camera.PictureSourceType.PHOTOLIBRARY);
						this.handlePhoto(item);
					}
				},
				{
					text: 'Kamera',
					handler: () => {
						this.cameraProvider.takePicture(this.cameraProvider.camera.PictureSourceType.CAMERA);
						this.handlePhoto(item);
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

	handlePhoto(item){
		let newFileName = this.createNewFileName(item);
// 		let newPath = this.createNewPhotoPath(item);
		let photoStream$ = this.cameraProvider.photoStream
		.subscribe(imagePath => {
			console.log("IMAGE PATH:");
			console.log(imagePath);

			let path = imagePath[0];
			let fileName = imagePath[1];

			let basePath = path.substring(0, path.lastIndexOf('cache')) + 'files/';
			let subDir = this.consiteProv.getConstructionsiteId() + '/'
			let newPath = basePath + subDir;

			let ext = fileName.substring(fileName.lastIndexOf('.'));
			let newFileName = this.createNewFileName(item) + ext;

// 			this.fileHandler.moveFile(path, fileName, newPath, newFileName);
// 			this.fileHandler.moveFileToProjDir(path, fileName, newFileName); //USE THIS ULTIMATELY
			//TODO: move below code to filehandler
			console.log("CHECKING SUBDIR");
			this.file.checkDir(basePath, subDir)
			.then(res => {
				console.log(JSON.stringify(res));
				console.log("SUBDIR EXISTS. COPYING FILE.");
				this.file.copyFile(path, fileName, newPath, newFileName)
				.then(res=> {
					console.log(JSON.stringify(res));
				})
				.catch(err => {console.log(JSON.stringify(err));});
			})
			.catch(err => {
				console.log(JSON.stringify(err));
				console.log("SUBDIR DOES NOT EXIST. CREATING SUBDIR.");
				let replace = false;
				this.file.createDir(basePath, subDir, replace)
					.then(res => {
						this.file.copyFile(path, fileName, newPath, newFileName)
						.then(res=> {
							console.log(JSON.stringify(res));
						});
					})
					.catch(err => {console.log(JSON.stringify(err));});
			});


			photoStream$.unsubscribe();
		},
		err => {
			console.log(JSON.stringify(err)); 
			photoStream$.unsubscribe();
		});
	}

	createNewFileName(item){
		let newFileName:string = "item_" + item.getId() + "_" + this.timeProvider.getDateStrForFilename();
		return newFileName;
	}


// 	addPictureToItem(item){// {{{
// 		let photoStream$ = this.cameraProvider.photoStream
// 		.subscribe(imagePath => {
// // 			this.event.imageFiles.push(imagePath);
// // 			photoStream$.unsubscribe();
// // 
// // 			console.log("IMAGE FILES:");
// // 			for (let image of this.event.imageFiles) {
// // 				console.log(image);
// // 			}
// 		});
// 	}// }}}



}
