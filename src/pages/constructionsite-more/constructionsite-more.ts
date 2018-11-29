import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ConstructionsiteContactsPage} from '../constructionsite-contacts/constructionsite-contacts';

/**
 * Generated class for the ConstructionsiteMorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-constructionsite-more',
  templateUrl: 'constructionsite-more.html',
})
export class ConstructionsiteMorePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstructionsiteMorePage');
  }

	openContactsPage(){
		this.navCtrl.push(ConstructionsiteContactsPage);
	}

	openSettingsPage(){
		// 		this.navCtrl.push(ConstructionsiteSettingsPage); //TODO create settings page
	}

}
