import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EquipmentItem } from '../../classes/equipment/equipment-item'
import { DamageReport } from '../../classes/equipment/damage-report'
import { ConstructionsiteReportDamagePage } from '../constructionsite-report-damage/constructionsite-report-damage'
import { EquipmentDamageReportDetailPage } from '../equipment-damage-report-detail/equipment-damage-report-detail';

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

	viewDamageReport(report: DamageReport){
		this.navCtrl.push(EquipmentDamageReportDetailPage, {report: report});
	}

	openReportDamagePage(){
		this.navCtrl.push(ConstructionsiteReportDamagePage, {item: this.item});
	}

}
