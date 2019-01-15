import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { File } from '@ionic-native/file';

import { ConstructionsiteProvider } from '../../providers/constructionsite/constructionsite';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { CameraProvider } from '../../providers/camera/camera';
import { FileHandlerProvider } from '../../providers/file-handler/file-handler';
import { TimeProvider } from '../../providers/time/time';


import { DamageReport } from '../../classes/constructionsite/damage-report'

/**
 * Generated class for the ConstructionsiteReportDamagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-constructionsite-report-damage',
  templateUrl: 'constructionsite-report-damage.html',
})
export class ConstructionsiteReportDamagePage {

	report: DamageReport;

	constructor(public navCtrl: NavController, public navParams: NavParams, 
		private actionSheetCtrl: ActionSheetController, 
		public cameraProvider: CameraProvider,
		private auth: AuthServiceProvider, 
		private file: File,
		public fileHandler: FileHandlerProvider,
		public timeProvider: TimeProvider,
		public consiteProv: ConstructionsiteProvider
	) {
	  this.report = new DamageReport();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstructionsiteReportDamagePage');
  }

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
		this.copyPictureToLocal()
			.then(res => {
				let nativeURL = res["nativeURL"];
				let newPath = nativeURL.substring(0, nativeURL.lastIndexOf('/')+1);
				let newFileName = nativeURL.substring(nativeURL.lastIndexOf('/')+1);
				this.addPictureToDamageReport(newPath, newFileName); 
			})
			.catch(err => {
				console.log(JSON.stringify(err));
				//TODO: small toast: error copying file
			});
	}// }}}
	copyPictureToLocal(){// {{{
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
	addPictureToDamageReport(path:string, fileName:string){// {{{
		// solution for image display found here: https://forum.ionicframework.com/t/unable-to-display-image-using-file-uri/84977/19
		this.file.readAsDataURL(path, fileName)
			.then(imagePathBase64 => {
				this.report.imageFiles.push(imagePathBase64);
				
				//DEBUG
				console.log("EVENT IMAGE FILES:");
				for (let image of this.report.imageFiles) {console.log(image);}
			})
			.catch(err => {
				console.log(JSON.stringify(err));
			});
	}// }}}
	createNewFileName(){// {{{
		let newFileName = "damagereport_" + this.report.id + "_" + this.timeProvider.getDateStrForFilename();
		return newFileName;
	}// }}}

	submitDamageReport(){// {{{
		this.report.author = this.getAuthorName();
		this.report.id = this.consiteProv.getNumDamageReports(); //TODO get better ID
		this.consiteProv.addDamageReport(this.report);
		console.log(this.report);
		this.navCtrl.pop();
	}// }}}
	getAuthorName(){// {{{
		let user = this.auth.getUserInfo();
		return user.surname[0] + ". " + user.name;
	}// }}}

}
