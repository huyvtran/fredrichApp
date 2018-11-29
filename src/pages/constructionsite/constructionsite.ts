import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ConstructionsiteOverviewPage } from '../constructionsite-overview/constructionsite-overview';
import { ConstructionsiteTimerecordingPage} from '../constructionsite-timerecording/constructionsite-timerecording';
import { ConstructionsiteDailyreportPage} from '../constructionsite-dailyreport/constructionsite-dailyreport';
import { ConstructionsiteEquipmentPage } from '../constructionsite-equipment/constructionsite-equipment';
// import { ConstructionsiteContactsPage } from '../constructionsite-contacts/constructionsite-contacts';
import { ConstructionsiteMorePage } from '../constructionsite-more/constructionsite-more';
import { ConstructionsitePhotoPage } from '../constructionsite-photo/constructionsite-photo';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ConstructionsiteProvider } from '../../providers/constructionsite/constructionsite';

/**
 * Generated class for the ConstructionsitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-constructionsite',
  templateUrl: 'constructionsite.html',
})
export class ConstructionsitePage {

	tab1Root = ConstructionsiteOverviewPage;
	tab2Root = ConstructionsitePhotoPage;
	tab3Root = ConstructionsiteDailyreportPage;
	tab4Root = ConstructionsiteMorePage;
	
	constructionsiteId:any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public consiteProv: ConstructionsiteProvider, public auth: AuthServiceProvider) {
	  console.log("CONSTR.SITE.ID:", this.constructionsiteId);
	  this.consiteProv.initialize(this.auth.getUserInfo().currentConstructionsiteId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstructionsitePage');
  }

}
