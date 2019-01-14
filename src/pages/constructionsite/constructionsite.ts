import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController} from 'ionic-angular';

import { ConstructionsiteOverviewPage } from '../constructionsite-overview/constructionsite-overview';
import { ConstructionsiteTimerecordingPage} from '../constructionsite-timerecording/constructionsite-timerecording';
import { ConstructionsiteDailyreportPage} from '../constructionsite-dailyreport/constructionsite-dailyreport';
import { ConstructionsiteEquipmentPage } from '../constructionsite-equipment/constructionsite-equipment';
import { ConstructionsiteSetGeolocationPage} from '../constructionsite-set-geolocation/constructionsite-set-geolocation';
import { ConstructionsiteContactsPage } from '../constructionsite-contacts/constructionsite-contacts';
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
// 	tab2Root = ConstructionsitePhotoPage;
	tab2Root = ConstructionsiteOverviewPage;
// 	tab3Root = ConstructionsiteContactsPage;
	tab3Root = ConstructionsiteMorePage;
	
	constructionsiteId: string;

	constructor(public navCtrl: NavController, // {{{
		public navParams: NavParams, 
		public consiteProv: ConstructionsiteProvider, 
		public auth: AuthServiceProvider, 
		private actionSheetCtrl: ActionSheetController, 
		private alertCtrl: AlertController) 
	{
	}// }}}

  ionViewDidLoad() {// {{{
		console.log('ionViewDidLoad ConstructionsitePage');
		console.log("CONSTR.SITE.ID:", this.constructionsiteId);
		this.initialize();
		this.loadConsiteData();
  }// }}}

	initialize(){// {{{
	  this.consiteProv.initialize(this.auth.getUserInfo().currentConstructionsiteId);
	}// }}}

	loadConsiteData(){// {{{ 
		this.consiteProv.loadConstructionsiteData();
		this.consiteProv.loadAllCompletedUpdates() //TODO: insert this updates to consiteprov
			.subscribe(res => {
				console.log("CONSITE FILLED:");
				console.log(this.consiteProv.getConstructionsite());
				console.log(this.consiteProv.getWeather());
				console.log(this.consiteProv.getContacts());
			});

	}// }}}


	public presentSetGeolocationActionSheet() {// {{{
		let actionSheet = this.actionSheetCtrl.create({
			title: 'Geokoordinaten nicht gesetzt.',
			buttons: [
				{
					text: 'Jetzt setzen',
					handler: () => {
						this.navCtrl.push(ConstructionsiteSetGeolocationPage);
					}
				},
				{
					text: "Sp&auml;ter",
					role: 'cancel',
					handler: () => {this.presentAlert();}
				}
			]
		});
		actionSheet.present();
	}// }}}
	presentAlert() {
		let alert = this.alertCtrl.create({
			title: 'Geodaten nicht gesetzt.',
			subTitle: "Bestimmte Funktionen der App ben&ouml;tigen den Standort (Wetterbericht usw.).",
			buttons: ['OK']
		});
		alert.present();
	}


}
