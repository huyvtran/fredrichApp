import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, App } from 'ionic-angular';

import { ConstructionsiteTimerecordingPage } from '../constructionsite-timerecording/constructionsite-timerecording';
import { ConstructionsiteEquipmentPage} from '../constructionsite-equipment/constructionsite-equipment';
import { ConstructionsiteEventsPage} from '../constructionsite-events/constructionsite-events';
import { ConstructionsiteDailyreportPage} from '../constructionsite-dailyreport/constructionsite-dailyreport';
import { ConstructionsitePhotoPage} from '../constructionsite-photo/constructionsite-photo';
import { ConstructionsiteContactsPage} from '../constructionsite-contacts/constructionsite-contacts';
import { ConstructionsiteEquipmentShippingPage } from '../constructionsite-equipment-shipping/constructionsite-equipment-shipping';
import { LoginPage } from '../login/login';

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

	constructor(public navCtrl: NavController, public navParams: NavParams, 
		private actionSheetCtrl: ActionSheetController,
		public app: App,
		public consiteProv: ConstructionsiteProvider, 
		private auth: AuthServiceProvider
	) {
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
		this.navCtrl.push(ConstructionsitePhotoPage);
	}

	openContactsPage(){
		this.navCtrl.push(ConstructionsiteContactsPage);
	}

	openDailyReport(){
		this.navCtrl.push(ConstructionsiteDailyreportPage);
	}

	openEventsPage(){
		this.navCtrl.push(ConstructionsiteEventsPage);
	}
	openShippingPage(){
		this.navCtrl.push(ConstructionsiteEquipmentShippingPage);
	}

	presentLogoutActionSheet(){
		let actionSheet = this.actionSheetCtrl.create({
			title: 'Ausloggen?',
			buttons: [
				{
					text: 'Ja',
					handler: () => {
						this.logout();
					}
				},
				{
					text: 'Nein',
					role: 'cancel'
				}
			]
		});
		actionSheet.present();
	}

	logout() {
		this.navCtrl.setRoot(LoginPage);
		this.auth.logout().subscribe(succ => {
			this.app.getRootNavs()[0].setRoot(LoginPage); // sets it to the very root of the app
			console.log("LOGGED OUT");
		});
	}

}
