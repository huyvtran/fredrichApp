import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Diagnostic } from '@ionic-native/diagnostic';
import {Observable} from 'rxjs/Observable';
// import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { ToastController, Platform } from 'ionic-angular';

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
	photoStream: any;
	photoStreamObserver:any;
	pictureOptions:any;

	constructor(public http: HttpClient, // {{{
		public camera: Camera,
		private diagnostic: Diagnostic,
		private transfer: Transfer, 
		private file: File, 
		private filePath: FilePath, 
		private toastCtrl: ToastController, 
		private platform: Platform, 
		private auth: AuthServiceProvider
	) {
			console.log('Hello CameraProvider Provider');
			this.checkPermissions();
			this.photoStream = Observable.create(observer => {
				this.photoStreamObserver = observer;
			});
			this.pictureOptions = {
				quality: 80,
				sourceType: '',
// 				saveToPhotoAlbum: true,
				saveToPhotoAlbum: false,
				correctOrientation: true
			};
	}// }}}

	checkPermissions(){// {{{
		this.diagnostic.isCameraAuthorized().then((authorized) => {
			if(authorized){
				//do nothing
			} else {
				this.diagnostic.requestCameraAuthorization().then((status) => {
					if(status == this.diagnostic.permissionStatus.GRANTED) {
						//do nothing
					} else {
						// Permissions not granted by user: present toast
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

		this.pictureOptions.sourceType = sourceType;
		console.log("SOURCE TYPE: " + sourceType);
		// Get the data of an image
		this.camera.getPicture(this.pictureOptions)
		.then((imagePath) => {
			// Special handling for Android library
			if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {// {{{
				console.log("DEALING WITH ANDROID PHOTOLIBRARY");
				this.filePath.resolveNativePath(imagePath)
				.then(filePath => {
					let path = filePath.substr(0, filePath.lastIndexOf('/') + 1);
					let currentFilename = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
					let fileInfo = [path, currentFilename];
					this.photoStreamObserver.next(fileInfo);
				})
				.catch(err => {
					console.log("ERROR: " + JSON.stringify(err));	
				});
			} // }}}
			else { //dealing with camera //{{{
				console.log(imagePath);
				let path =  imagePath.substring(0,imagePath.lastIndexOf('/')+1);
				let currentFilename = imagePath.substring(imagePath.lastIndexOf('/')+1);
				let fileInfo = [path, currentFilename];
				this.photoStreamObserver.next(fileInfo);
			}// }}}
		}, 
		(err) => {
			console.log("ERROR WHILE TAKING PICTURE");
			console.log(err);
			this.presentToast('Error while selecting image.');
		});
	}	// }}}

	private presentToast(text) {// {{{
		let toast = this.toastCtrl.create({
			message: text,
			duration: 3000,
			position: 'top'
		});
		toast.present();
	}// }}}

	// Always get the accurate path to your apps folder
	// TODO: move to filehandler
	public pathForImage(img) {// {{{
		if (img === null) {
			return '';
		} else {
			return cordova.file.dataDirectory + img;
		}
	}// }}}

}
