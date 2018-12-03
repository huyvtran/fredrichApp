import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Diagnostic } from '@ionic-native/diagnostic';
// import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';

import { AuthServiceProvider } from '../auth-service/auth-service';

declare var cordova: any; // global variable for paths

/*
  Generated class for the CameraProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CameraProvider {

	lastImage: string = null;
	loading: Loading;

	constructor(public http: HttpClient, // {{{
		public camera: Camera,
		private diagnostic: Diagnostic,
		private transfer: Transfer, 
		private file: File, 
		private filePath: FilePath, 
		public actionSheetCtrl: ActionSheetController, 
		public toastCtrl: ToastController, 
		public platform: Platform, 
		public loadingCtrl: LoadingController,
		private auth: AuthServiceProvider) {
			console.log('Hello CameraProvider Provider');
			this.checkPermissions();
  }// }}}

	checkPermissions(){// {{{
		this.diagnostic.isCameraAuthorized().then((authorized) => {
			if(authorized){
// 				this.initializePreview();
			} else {
				this.diagnostic.requestCameraAuthorization().then((status) => {
					if(status == this.diagnostic.permissionStatus.GRANTED) {
// 						this.initializePreview();
					} else {
						// Permissions not granted
						// Therefore, create and present toast
						this.toastCtrl.create(
						{
							message: "Cannot access camera",
							position: "bottom",
							duration: 5000
						})
						.present();
					}
				});
			}
		});
	}// }}}

	public takePicture(sourceType) {// {{{
		// Create options for the Camera Dialog
		var options = {
			quality: 80,
			sourceType: sourceType,
			saveToPhotoAlbum: false,
			correctOrientation: true
		};

		console.log("takePicture OPTIONS:");
		console.log(options);
		// Get the data of an image
		this.camera.getPicture(options)
		.then((imagePath) => {
			// Special handling for Android library
			console.log(sourceType);
			if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
				console.log("DEALING WITH ANDROID PHOTOLIBRARY");
				this.filePath.resolveNativePath(imagePath)
				.then(filePath => {
					let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
					let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
					this.copyFileToLocalDir(correctPath, currentName, this.createFileName());

					console.log("image Path:");
					console.log(imagePath);
					console.log("correct Path:");
					console.log(correctPath);
					console.log("current Name:")
					console.log(currentName);
				});
			} else {
				console.log("TAKING PICTURE");
				var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
				var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
				var newFileName =  this.createFileName();
				this.copyFileToLocalDir(correctPath, currentName, newFileName);

				console.log("image Path:");
				console.log(imagePath);
				console.log("correct Path:");
				console.log(correctPath);
				console.log("current Name:")
				console.log(currentName);
				console.log("new Filename:")
				console.log(newFileName);

			}
		}, (err) => {
				console.log("ERROR WHILE TAKING PICTURE");
				console.log(err);
				this.presentToast('Error while selecting image.');
		});
	}	// }}}

	// Create a new name for the image
	private createFileName() {// {{{
		var d = new Date();
		let dateStr = d.toISOString();
		dateStr = dateStr.substr(0,dateStr.lastIndexOf('.'));
		let newFileName =  this.auth.getUserInfo().currentConstructionsiteId + "_" + dateStr + ".jpg";
		console.log(newFileName);
		return newFileName;
	}// }}}

	// Copy the image to a local folder
	private copyFileToLocalDir(namePath, currentName, newFileName) {// {{{
		this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName)
		.then(success => {
			console.log("NEW FILE NAME:");
			console.log(newFileName);
			this.lastImage = newFileName;
		}, error => {
			this.presentToast('Error while storing file.');
			console.log(error);
		});
	}// }}}

	private presentToast(text) {// {{{
		let toast = this.toastCtrl.create({
			message: text,
			duration: 3000,
			position: 'top'
		});
		toast.present();
	}// }}}

	// Always get the accurate path to your apps folder
	public pathForImage(img) {// {{{
		if (img === null) {
			return '';
		} else {
			return cordova.file.dataDirectory + img;
		}
	}// }}}

}
