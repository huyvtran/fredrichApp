import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController} from 'ionic-angular';

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

	constructor(public navCtrl: NavController, public navParams: NavParams, public consiteProv: ConstructionsiteProvider, public auth: AuthServiceProvider, private actionSheetCtrl: ActionSheetController) {
	  console.log("CONSTR.SITE.ID:", this.constructionsiteId);
		this.initialize();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstructionsitePage');
	  this.loadConsiteData();
  }

	initialize(){// {{{
	  this.consiteProv.initialize(this.auth.getUserInfo().currentConstructionsiteId);
	}// }}}

	loadConsiteData(){// {{{ load constructionsite data first, then secondary data like weather etc
		this.consiteProv.loadConstructionsiteData();
		this.consiteProv.loadDataUpdates()
			.subscribe(loadingStatus => {
				console.log("LOADING STATUS: ", loadingStatus);
				if(loadingStatus.consiteData && !loadingStatus.weather){
					this.loadSecondaryData();
				}
			},
			err => {},
			() => {
				console.log("CONSITE FILLED:");
				console.log(this.consiteProv.getConstructionsite())
			});
		this.consiteProv.checkLoadDataCompleted();
	}// }}}

	loadSecondaryData(){// {{{
		console.log("LOADING SECONDARY DATA");
		this.consiteProv.loadDataUpdates()
			.subscribe(loadingStatus => {
				if(loadingStatus.consiteData){
					let $check = this.consiteProv.isGeolocationValid()
						.subscribe(isValid => {
							if(isValid){
								this.consiteProv.loadWeatherData();
// 								$check.unsubscribe();
							} else {
								this.presentSetGeolocationActionSheet();
							}
						},
						err => {
							console.log(err);
						});
				}
			},
			err => {},
			() => {
			});

	}// }}}

	public presentSetGeolocationActionSheet() {// {{{
		let actionSheet = this.actionSheetCtrl.create({
			title: 'Geokoordinaten nicht gesetzt - sie werden f&uuml;r den Wetterbericht etc. gebraucht.',
			buttons: [
				{
					text: 'Jetzt setzen:',
					handler: () => {
						//do sth
					}
				},
				{
					text: 'sp√ter setzen',
					role: 'cancel'
				}
			]
		});
		actionSheet.present();
	}// }}}


}
