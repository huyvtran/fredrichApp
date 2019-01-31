import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ConstructionsiteEquipmentCheckInPage } from '../constructionsite-equipment-check-in/constructionsite-equipment-check-in';
import { ConstructionsiteEquipmentCheckOutPage } from '../constructionsite-equipment-check-out/constructionsite-equipment-check-out';

/**
 * Generated class for the ConstructionsiteEquipmentShippingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-constructionsite-equipment-shipping',
  templateUrl: 'constructionsite-equipment-shipping.html',
})
export class ConstructionsiteEquipmentShippingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstructionsiteEquipmentShippingPage');
  }

	openEquipmentCheckinPage(){
		this.navCtrl.push(ConstructionsiteEquipmentCheckInPage);
	}

	openEquipmentCheckoutPage(){
		this.navCtrl.push(ConstructionsiteEquipmentCheckOutPage);
	}

}
