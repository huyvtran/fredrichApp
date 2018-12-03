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
  selector: 'page-constructionsite-event',
  templateUrl: 'constructionsite-event.html',
})
export class ConstructionsiteEventPage {

	event: ConstructionsiteEvent;

  constructor(public navCtrl: NavController, public navParams: NavParams, private actionSheetCtrl: ActionSheetController, private auth: AuthServiceProvider, public cameraProvider: CameraProvider) {
	  this.event = new ConstructionsiteEvent();// 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstructionsiteEventPage');
  }

	public presentCameraActionSheet() {// {{{
		let actionSheet = this.actionSheetCtrl.create({
			title: 'Select Image Source',
			buttons: [
				{
					text: 'Load from Library',
					handler: () => {
						this.cameraProvider.takePicture(this.cameraProvider.camera.PictureSourceType.PHOTOLIBRARY);
// 						this.event.imageFiles.push("image" + this.event.imageFiles.length);
					}
				},
				{
					text: 'Use Camera',
					handler: () => {
						this.cameraProvider.takePicture(this.cameraProvider.camera.PictureSourceType.CAMERA);
// 						this.event.imageFiles.push("image" + this.event.imageFiles.length);
					}
				},
				{
					text: 'Cancel',
					role: 'cancel'
				}
			]
		});
		actionSheet.present();
	}// }}}

	submitEvent(){// {{{
		this.event.author = this.getAuthorName();
		console.log(this.event);
	}// }}}


	getAuthorName(){// {{{
		let user = this.auth.getUserInfo();
		return user.surname[0] + ". " + user.name;
	}// }}}
// 	openCamera(){
// 		this.navCtrl.push(CameraViewPage);
// 	}

}
