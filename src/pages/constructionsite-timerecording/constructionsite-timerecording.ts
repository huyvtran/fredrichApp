import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ConstructionsiteProvider } from '../../providers/constructionsite/constructionsite';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the ConstructionsiteTimerecordingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-constructionsite-timerecording',
  templateUrl: 'constructionsite-timerecording.html',
})
export class ConstructionsiteTimerecordingPage {

	workers:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public consiteProv: ConstructionsiteProvider, private auth: AuthServiceProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstructionsiteTimerecordingPage');
  }

	itemSelected(worker){

	}

}
