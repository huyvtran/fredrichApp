import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

import { ConstructionsiteProvider } from '../../providers/constructionsite/constructionsite';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { CameraProvider } from '../../providers/camera/camera';

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
		public consiteProv: ConstructionsiteProvider) {
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
						this.addPictureToDamageReport();
					}
				},
				{
					text: 'Kamera',
					handler: () => {
						this.cameraProvider.takePicture(this.cameraProvider.camera.PictureSourceType.CAMERA);
						this.addPictureToDamageReport();
// 						this.report.imageFiles.push("image" + this.report.imageFiles.length);
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

	addPictureToDamageReport(){// {{{
		let photoStream$ = this.cameraProvider.photoStream
		.subscribe(imagePath => {
			this.report.imageFiles.push(imagePath);
			photoStream$.unsubscribe();

			console.log("IMAGE FILES:");
			for (let image of this.report.imageFiles) {
				console.log(image);
			}
		});
	}// }}}

}
