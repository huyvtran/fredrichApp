import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { ConstructionsiteSetGeolocationPage} from '../constructionsite-set-geolocation/constructionsite-set-geolocation';
import { LoginPage } from '../login/login';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ConstructionsiteProvider } from '../../providers/constructionsite/constructionsite';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider, public consiteProv: ConstructionsiteProvider, public app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstructionsiteSettingsPage');
  }

	openSetGeocoordsPage(){
		this.navCtrl.push(ConstructionsiteSetGeolocationPage);
	}

	public logout() {
		this.auth.logout().subscribe(succ => {
// 			this.navCtrl.setRoot('LoginPage'); // XXX: this keeps tabs
			this.app.getRootNavs()[0].setRoot(LoginPage); // sets it to the very root of the app
			console.log("LOGGED OUT");
		});
	}


}
