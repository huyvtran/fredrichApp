import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { ConstructionsiteProvider } from '../../providers/constructionsite/constructionsite';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TelephoneProvider } from '../../providers/telephone/telephone';

/**
 * Generated class for the ConstructionsiteContactsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-constructionsite-contacts',
  templateUrl: 'constructionsite-contacts.html',
})
export class ConstructionsiteContactsPage {

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		private auth: AuthServiceProvider, 
		public consiteProv: ConstructionsiteProvider,
		private telephone: TelephoneProvider,
		private toastCtrl: ToastController
	) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstructionsiteContactsPage');
  }

	itemSelected(contact){

	}

	toggleCategory(i){
		this.consiteProv.contacts.categoryRoles[i].open = !this.consiteProv.contacts.categoryRoles[i].open;
	}

	// calling a number
	callContact(contact){
		let params = {calleeStr: contact.name, phoneNr: contact.phoneNr};
		this.telephone.presentActionSheetPhone(params);
	}

	writeEmailToContact(contact){
		//TODO: write email routine
		this.presentToast();
	}

	presentToast() {
		let toast = this.toastCtrl.create({
			message: 'Email-Funktion wird bei Bedarf eingebaut.',
			duration: 3000,
			position: 'middle'
		});

		toast.onDidDismiss(() => {
			console.log('Dismissed toast');
		});

		toast.present();
	}

}
