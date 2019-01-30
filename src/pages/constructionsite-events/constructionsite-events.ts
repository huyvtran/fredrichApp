import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ConstructionsiteProvider } from '../../providers/constructionsite/constructionsite';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { ConstructionsiteReportEventPage } from '../constructionsite-report-event/constructionsite-report-event';
import { ConstructionsiteReportDamagePage } from '../constructionsite-report-damage/constructionsite-report-damage';

/**
 * Generated class for the ConstructionsiteEventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-constructionsite-events',
  templateUrl: 'constructionsite-events.html',
})
export class ConstructionsiteEventsPage {

	constructor(public navCtrl: NavController, public navParams: NavParams, 
		private auth: AuthServiceProvider, 
		public consiteProv: ConstructionsiteProvider) 
	{
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstructionsiteEventsPage');
  }

	openReportEventPage(){
		this.navCtrl.push(ConstructionsiteReportEventPage);
	}

	openEventDetailPage(event){
		//TODO open event detail page
	}

	openReportDamagePage(){
// 		this.navCtrl.push(ConstructionsiteReportDamagePage);
	}
}
