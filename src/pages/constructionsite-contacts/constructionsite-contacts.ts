import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

	contacts:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
	  this.contacts = {builder: {name: "Heinz Mueller", telephone: "0471/999999", email: "schreib@mirnemail.de"}, 
		  constructionSupervisor: {name: "Heinz Mueller", telephone: "0471/999999", email: "schreib@mirnemail.de"},
		  surveyor: {name: "Heinz Mueller", telephone: "0471/999999", email: "schreib@mirnemail.de"},
		  structuralEngineer: {name: "Heinz Mueller", telephone: "0471/999999", email: "schreib@mirnemail.de"}};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstructionsiteContactsPage');
  }

	itemselected(contact){

	}

}
