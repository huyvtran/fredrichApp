import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConstructionsiteSetGeolocationPage} from '../constructionsite-set-geolocation/constructionsite-set-geolocation';

/**
 * Generated class for the ConstructionsiteSettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-constructionsite-settings',
  templateUrl: 'constructionsite-settings.html',
})
export class ConstructionsiteSettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstructionsiteSettingsPage');
  }

	openSetGeocoordsPage(){
		this.navCtrl.push(ConstructionsiteSetGeolocationPage);
	}

}
