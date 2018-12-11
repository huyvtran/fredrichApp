import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Diagnostic } from '@ionic-native/diagnostic';
import {Observable} from 'rxjs/Observable';
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
	photoStream: any;
	photoStreamObserver:any;
	copyFileListener:any;
	copyFileObserver:any;

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
			this.photoStream = Observable.create(observer => {
				this.photoStreamObserver = observer;
			});
			this.copyFileListener = Observable.create(observer => {
				this.copyFileObserver = observer;
			});

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

		console.log("SOURCE TYPE: " + sourceType);
		// Get the data of an image
		this.camera.getPicture(options)
		.then((imagePath) => {
			// Special handling for Android library
			if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {// {{{
				console.log("DEALING WITH ANDROID PHOTOLIBRARY");
				this.filePath.resolveNativePath(imagePath)
				.then(filePath => {
					let path = filePath.substr(0, filePath.lastIndexOf('/') + 1);
					let currentFilename = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
					var newFileName = this.createFileName();
					if(0){// {{{
						//FIXME: cannot find file after copy -> fix listener?
						//TODO: do the same for camera below
						this.copyFileToLocalDir(path, currentFilename, newFileName);
						console.log("PATH: " + path + "; FILENAME OLD: " + newFileName);
// 						this.file.readAsDataURL(path, currentFilename)
						this.copyFileListener
						.subscribe(copyStatus => {
							console.log("COPY STATUS: " + String(copyStatus));
							this.file.readAsDataURL(path, newFileName)
							.then(res=> {
								console.log(JSON.stringify(res));
								if(res){
									console.log(JSON.stringify(res));
									this.photoStreamObserver.next(res);
								}
							})
							.catch(err => {
								console.log(JSON.stringify(err));
							});
						});
					} // }}}
					else {// {{{
// 						this.file.readAsDataURL(path, newFileName)
						this.file.readAsDataURL(path, currentFilename)
						.then(res=> {
							console.log(JSON.stringify(res));
							if(res){
								console.log(JSON.stringify(res));
								this.photoStreamObserver.next(res);
							}
						})
						.catch(err => {
							console.log(JSON.stringify(err));
						});
					}// }}}
				})
				.catch(err => {
					console.log("ERROR: " + JSON.stringify(err));	
				});

			} // }}}
			else { //dealing with camera //{{{
				// solution found here: https://forum.ionicframework.com/t/unable-to-display-image-using-file-uri/84977/19
				console.log(imagePath);
				let path =  imagePath.substring(0,imagePath.lastIndexOf('/')+1);
				let currentFilename = imagePath.substring(imagePath.lastIndexOf('/')+1);
				var newFileName =  this.createFileName();
				console.log("PATH: " + path + "; FILENAME OLD: " + currentFilename);
				// 					this.copyFileToLocalDir(path, currentFilename, newFileName); //TODO: fix copying, so that readAsDataURL resolves successfully
				console.log("PATH: " + path + "; FILENAME OLD: " + newFileName);
				this.file.readAsDataURL(path, currentFilename) //TODO: replace with newFileName
				.then(res=> {
					console.log(JSON.stringify(res));
					this.photoStreamObserver.next(res);
				});
			}// }}}
		}, 
		(err) => {
			console.log("ERROR WHILE TAKING PICTURE");
			console.log(err);
			this.presentToast('Error while selecting image.');
		});
	}	// }}}

	private createFileName() {// {{{
		let d = new Date();
		let newFileName:string = "";

		if(1){
			let n = d.getTime();
			newFileName =  n + ".jpg";
		} else {
			let dateStr = d.toISOString();
			dateStr = dateStr.substr(0,dateStr.lastIndexOf('.'));
			newFileName =  this.auth.getUserInfo().currentConstructionsiteId + "_" + dateStr + ".jpg";
		}
		return newFileName;
	}// }}}
	
	copyFileToLocalDir(namePath, currentName, newFileName) {// {{{
		// cordova.file.dataDirectory
		console.log("COPYING FILE TO LOCAL DIR");
		let externalStoragePath: string =  cordova.file.dataDirectory;

		this.file.resolveLocalFilesystemUrl(namePath + currentName)
			.then((entry: any)=>{
// 				console.log('ENTRY:');
// 				console.log(JSON.stringify(entry));
				this.file.resolveLocalFilesystemUrl(externalStoragePath)
					.then((dirEntry: any)=>{
// 						entry.copyTo(dirEntry, newFileName, this.successCopy(), this.failCopy());
						entry.copyTo(dirEntry, newFileName, this.successCopy());
					}).catch((error)=>{
						console.log(error);
					});
			})
			.catch((error)=>{
				console.log(error);
			});

	}// }}}

	successCopy(){
// 		console.log("SUCCESS COPY ENTRY: " + JSON.stringify(entry));
		this.copyFileObserver.next(true);
	}

	failCopy(){
// 		console.log("FAILED COPY ENTRY: " + JSON.stringify(error));
		this.copyFileObserver.next(false);
	}


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
