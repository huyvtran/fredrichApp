import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DailyReport } from '../../classes/constructionsite/dailyreport';
import { ConstructionsiteProvider } from '../../providers/constructionsite/constructionsite';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the ConstructionsiteDailyreportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-constructionsite-dailyreport',
  templateUrl: 'constructionsite-dailyreport.html',
})
export class ConstructionsiteDailyreportPage {

	dailyReport: DailyReport;
	workerRoles: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private consiteProv: ConstructionsiteProvider, private auth: AuthServiceProvider) {
	  this.consiteProv.generateDailyReport();
	  this.dailyReport = this.consiteProv.getDailyReport();
	  console.log(this.dailyReport)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstructionsiteDailyreportPage');
  }

}
