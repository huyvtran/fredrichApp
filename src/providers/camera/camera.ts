import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Diagnostic } from '@ionic-native/diagnostic';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { File } from '@ionic-native/file';
import { ToastController } from 'ionic-angular';

declare var cordova: any; // global variable for paths

/*
  Generated class for the CameraProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CameraProvider {

	picture: any;
	// camera options (Size and location). In the following example, the preview uses the rear camera and display the preview in the back of the webview{{{
	cameraPreviewOpts: CameraPreviewOptions = {
		x: 0,
		y: 0,
		width: window.screen.width,
		height: window.screen.height,
		camera: 'rear',
		tapPhoto: true,
		previewDrag: true,
		toBack: true,
		alpha: 1
	};// }}}

	pictureOpts: CameraPreviewPictureOptions = {// {{{
		width: 320,
		height: 320,
		quality: 85
	}// }}}

	constructor(public http: HttpClient, // {{{
		private cameraPreview: CameraPreview, 
		public toastCtrl: ToastController, 
		private diagnostic: Diagnostic,
		private file: File) {
			console.log('Hello CameraProvider Provider');
			this.checkPermissions();
  }// }}}

	checkPermissions(){// {{{
		this.diagnostic.isCameraAuthorized().then((authorized) => {
			if(authorized)
				this.initializePreview();
			else {
				this.diagnostic.requestCameraAuthorization().then((status) => {
					if(status == this.diagnostic.permissionStatus.GRANTED)
						this.initializePreview();
					else {
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

	initializePreview() {// {{{
		//set background color to transparent
		(window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
		// start camera
		this.cameraPreview.startCamera(this.cameraPreviewOpts)
			.then(
				(res) => {
					console.log(res)
				},
				(err) => {
					console.log(err)
			});

// 		this.cameraPreview.setOnPictureTakenHandler()
// 			.subscribe((result) => {
// // 				this.moveFileToExternalStorage(result[0]); // Move picture only
// 				console.log(result);
// 		});


	}// }}}

	takePicture(){// {{{
		this.cameraPreview.takePicture(this.pictureOpts)
			.then((imageData) => {
				console.log(imageData);
				this.picture = 'data:image/jpeg;base64,' + imageData;
				console.log(this.picture);
			}, (err) => {
				console.log(err);
				this.picture = 'assets/img/test.jpg';
		});
	}// }}}

	moveFileToExternalStorage(fileName: string) {// {{{
		// Determine paths
		let externalStoragePath: string = cordova.file.externalApplicationStorageDirectory;
		let currentPath: string = cordova.file.applicationStorageDirectory + "files/";

		// Extract filename
		fileName = fileName.split("/").pop();

		// Move the file
		this.file.moveFile(currentPath, fileName, externalStoragePath, fileName)
		.then(_ => {
			this.toastCtrl.create({
				 message: "Saved one photo",
				 position: "bottom",
				 duration: 2000
			}).present();
		});
	}// }}}

	stopCamera(){// {{{
		//make background non-transporent
		(window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
		this.cameraPreview.stopCamera();
	}// }}}

}
