import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ConstructionsiteTimerecordingPage } from '../constructionsite-timerecording/constructionsite-timerecording';
import { ConstructionsiteEquipmentPage} from '../constructionsite-equipment/constructionsite-equipment';
import { ConstructionsiteEventsPage} from '../constructionsite-events/constructionsite-events';
import { ConstructionsiteDailyreportPage} from '../constructionsite-dailyreport/constructionsite-dailyreport';

import { ConstructionsiteProvider } from '../../providers/constructionsite/constructionsite';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the ConstructionsiteOverviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-constructionsite-overview',
  templateUrl: 'constructionsite-overview.html',
})
export class ConstructionsiteOverviewPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public consiteProv: ConstructionsiteProvider, private auth: AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstructionsiteOverviewPage');
		console.log(this.consiteProv.getConstructionsite());
  }

	openWorkersPage(){
		this.navCtrl.push(ConstructionsiteTimerecordingPage);
	}

	openEquipmentPage(){
		this.navCtrl.push(ConstructionsiteEquipmentPage);
	}
	
	openWeatherPage(){

	}

	openPhotoPage(){

	}

	openContactsPage(){

	}

	openDailyReport(){
		this.navCtrl.push(ConstructionsiteDailyreportPage);
	}

	openEventsPage(){
		this.navCtrl.push(ConstructionsiteEventsPage);
	}
}
