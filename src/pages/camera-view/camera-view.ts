import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CameraProvider } from '../../providers/camera/camera';


/**
 * Generated class for the CameraViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-camera-view',
  templateUrl: 'camera-view.html',
})
export class CameraViewPage {

	constructor(public navCtrl: NavController, public navParams: NavParams, public camera: CameraProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraViewPage');
  }

	ionViewDidEnter() {
	  this.camera.initializePreview();
	}

	ionViewDidLeave() {
		this.camera.stopCamera();
		this.navCtrl.pop();
	}

}
