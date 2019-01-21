import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EquipmentItem } from '../../classes/equipment/equipment-item'
import { ConstructionsiteReportDamagePage } from '../constructionsite-report-damage/constructionsite-report-damage'

/**
 * Generated class for the ConstructionsiteEquipmentDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-constructionsite-equipment-detail',
  templateUrl: 'constructionsite-equipment-detail.html',
})
export class ConstructionsiteEquipmentDetailPage {

	item: EquipmentItem;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
	  this.item = this.navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstructionsiteEquipmentDetailPage');
  }

	viewDamageReport(report){
		//TODO Navcontroller push of damage report view page
	}

	openReportDamagePage(){
		this.navCtrl.push(ConstructionsiteReportDamagePage, {item: this.item});
	}

}
