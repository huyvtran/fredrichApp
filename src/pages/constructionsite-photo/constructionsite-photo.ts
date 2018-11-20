import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConstructionsitePhotoEquipmentPage } from '../constructionsite-photo-equipment/constructionsite-photo-equipment';
// import { ConstructionsitePhotoSitePage } from '../constructionsite-photo-site/constructionsite-photo-site';
import { CameraViewPage } from '../camera-view/camera-view';

/**
 * Generated class for the ConstructionsitePhotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-constructionsite-photo',
  templateUrl: 'constructionsite-photo.html',
})
export class ConstructionsitePhotoPage {

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ConstructionsitePhotoPage');
	}

	openPhotoEquipmentPage(){
		this.navCtrl.push(ConstructionsitePhotoEquipmentPage);
	}

	openPhotoSitePage(){
		//set options
		this.navCtrl.push(CameraViewPage);
	}

}
