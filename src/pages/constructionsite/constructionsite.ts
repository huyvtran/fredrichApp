import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConstructionsiteOverviewPage } from '../constructionsite-overview/constructionsite-overview';
import { ConstructionsiteTimerecordingPage} from '../constructionsite-timerecording/constructionsite-timerecording';
import { ConstructionsiteDailyreportPage} from '../constructionsite-dailyreport/constructionsite-dailyreport';
import { ConstructionsiteEquipmentPage } from '../constructionsite-equipment/constructionsite-equipment';
import { ConstructionsiteContactsPage } from '../constructionsite-contacts/constructionsite-contacts';
import { ConstructionsitePhotoPage } from '../constructionsite-photo/constructionsite-photo';

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
	tab4Root = ConstructionsiteEquipmentPage;
	tab5Root = ConstructionsiteContactsPage;
	
	constructionsite:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
	  this.constructionsite = this.navParams.get('constructionsite');
	  console.log(this.constructionsite);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstructionsitePage');
  }

}
