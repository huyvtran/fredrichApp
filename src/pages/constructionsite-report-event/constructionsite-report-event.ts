import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController} from 'ionic-angular';

import { ConstructionsiteProvider } from '../../providers/constructionsite/constructionsite';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { CameraProvider } from '../../providers/camera/camera';

import { ConstructionsiteEvent } from '../../classes/constructionsite/constructionsite-event'

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

	constructor(public navCtrl: NavController, public navParams: NavParams, 
		private actionSheetCtrl: ActionSheetController, 
		private auth: AuthServiceProvider, 
		public consiteProv: ConstructionsiteProvider,
		public cameraProvider: CameraProvider) {
	  this.event = new ConstructionsiteEvent();// 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstructionsiteReportEventPage');
  }

	public presentCameraActionSheet() {// {{{
		let actionSheet = this.actionSheetCtrl.create({
			title: 'Bildquelle auswaehlen:',
			buttons: [
				{
					text: 'Aus Galerie laden',
					handler: () => {
						this.cameraProvider.takePicture(this.cameraProvider.camera.PictureSourceType.PHOTOLIBRARY);
						this.addPictureToEvent();
					}
				},
				{
					text: 'Kamera',
					handler: () => {
						this.cameraProvider.takePicture(this.cameraProvider.camera.PictureSourceType.CAMERA);
						this.addPictureToEvent();
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

	addPictureToEvent(){// {{{
		let photoStream$ = this.cameraProvider.photoStream
		.subscribe(imagePath => {
			this.event.imageFiles.push(imagePath);
			photoStream$.unsubscribe();

			console.log("IMAGE FILES:");
			for (let image of this.event.imageFiles) {
				console.log(image);
			}
		});
	}// }}}

}
