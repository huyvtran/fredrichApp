import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ConstructionsiteShippingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-constructionsite-shipping',
  templateUrl: 'constructionsite-shipping.html',
})
export class ConstructionsiteShippingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstructionsiteShippingPage');
  }

	openEquipmentCheckinPage(){

	}

	openEquipmentCheckoutPage(){

	}
}
