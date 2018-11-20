import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CameraViewPage } from '../camera-view/camera-view';



/**
 * Generated class for the ConstructionsitePhotoSitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-constructionsite-photo-site',
  templateUrl: 'constructionsite-photo-site.html',
})
export class ConstructionsitePhotoSitePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
	  // TODO: set imageoptions here
	  this.navCtrl.push(CameraViewPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstructionsitePhotoSitePage');
  }

}
