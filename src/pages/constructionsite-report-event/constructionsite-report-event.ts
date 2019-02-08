import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController} from 'ionic-angular';
import { File } from '@ionic-native/file';

import { ConstructionsiteProvider } from '../../providers/constructionsite/constructionsite';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { CameraProvider } from '../../providers/camera/camera';
import { FileHandlerProvider } from '../../providers/file-handler/file-handler';
import { TimeProvider } from '../../providers/time/time';

import { ConstructionsiteEvent } from '../../classes/constructionsite/constructionsite-event'
import { ImageFile } from '../../classes/datatypes/image-file';


/**
 * Generated class for the ConstructionsiteEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-constructionsite-report-event',
  templateUrl: 'constructionsite-report-event.html',
})
export class ConstructionsiteReportEventPage {

	event: ConstructionsiteEvent;

	constructor(public navCtrl: NavController, public navParams: NavParams, // {{{
		private actionSheetCtrl: ActionSheetController, 
		private auth: AuthServiceProvider, 
		public consiteProv: ConstructionsiteProvider,
		public cameraProvider: CameraProvider,
		private file: File,
		public fileHandler: FileHandlerProvider,
		public timeProvider: TimeProvider
	) {
	  this.event = new ConstructionsiteEvent();// 
  }// }}}

  ionViewDidLoad() {// {{{
    console.log('ionViewDidLoad ConstructionsiteReportEventPage');

	  //TESTING ONLY
	  let imgData = {id:"0", path:'assets/imgs/', fileName:'FredrichLogo.png'};
	  let imageFile = new ImageFile(imgData);
		this.event.addImageFile(imageFile);
  }// }}}

	submitEvent(){// {{{
		this.event.author = this.getAuthorName();
		this.event.id = this.consiteProv.getNumEvents(); //TODO get better ID
		console.log(this.event);
		this.consiteProv.addEvent(this.event);
		this.navCtrl.pop();
	}// }}}
	getAuthorName(){// {{{
		let user = this.auth.getUserInfo();
		return user.surname[0] + ". " + user.name;
	}// }}}

	public presentCameraActionSheet() {// {{{
		let actionSheet = this.actionSheetCtrl.create({
			title: 'Bildquelle auswaehlen:',
			buttons: [
				{
					text: 'Aus Galerie laden',
					handler: () => {
						this.cameraProvider.takePicture(this.cameraProvider.camera.PictureSourceType.PHOTOLIBRARY);
						this.handleImage();
					}
				},
				{
					text: 'Kamera',
					handler: () => {
						this.cameraProvider.takePicture(this.cameraProvider.camera.PictureSourceType.CAMERA);
						this.handleImage();
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
	handleImage(){// {{{
		this.copyImageToLocal()
			.then(res => {
				let nativeURL = res["nativeURL"];
				let newPath = nativeURL.substring(0, nativeURL.lastIndexOf('/')+1);
				let newFileName = nativeURL.substring(nativeURL.lastIndexOf('/')+1);
				this.file.readAsDataURL(newPath, newFileName)
					.then(imagePathBase64 => {
						let imgData = {id:"123", path:newPath, filename:newFileName, base64Path: imagePathBase64};
						console.log("IMAGE FILE DATA:")
						console.log(JSON.stringify(imgData));
						let imageFile = new ImageFile(imgData);
						this.event.addImageFile(imageFile);
					})
					.catch(err => {
						console.log(JSON.stringify(err));
					});
			})
			.catch(err => {
				console.log(JSON.stringify(err));
				//TODO: small toast: error copying file
			});
	}// }}}
	copyImageToLocal(){// {{{
		const promise = new Promise((resolve, reject) => {
			let photoStream$ = this.cameraProvider.photoStream
				.subscribe(imagePath => {
					let path = imagePath[0];
					let fileName = imagePath[1];
					let ext = fileName.substring(fileName.lastIndexOf('.'));
					let newFileName = this.createNewFileName() + ext;
					this.fileHandler.copyFileToProjDir(path, fileName, newFileName)
						.then(res => {
							resolve(res);
						})
						.catch(err => {
							reject(err);
						});
					photoStream$.unsubscribe();
				},
				err => {
					console.log(JSON.stringify(err)); 
					photoStream$.unsubscribe();
				});
		});
		return promise;
	}// }}}
	createNewFileName(){// {{{
		let newFileName = "event_" + this.event.getId() + "_" + this.timeProvider.getDateStrForFilename();
		return newFileName;
	}// }}}
	deleteImage(){// {{{
		console.log("NOT IMPLEMENTED YET");
// 		this.event.deleteImage(imageId);
	}// }}}
	viewImage(){// {{{
		console.log("NOT IMPLEMENTED YET");
// 		this.event.viewImage(imageId);
	}// }}}

}
