import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DamageReport } from '../../classes/equipment/damage-report'

/**
 * Generated class for the EquipmentDamageReportDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-equipment-damage-report-detail',
  templateUrl: 'equipment-damage-report-detail.html',
})
export class EquipmentDamageReportDetailPage {

	report: DamageReport;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.report = this.navParams.get('report');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EquipmentDamageReportDetailPage');
  }

}
