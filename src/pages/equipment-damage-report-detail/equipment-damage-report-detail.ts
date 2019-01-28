import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

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

	constructor(public navCtrl: NavController, public navParams: NavParams,
		private actionSheetCtrl: ActionSheetController) {
		this.report = this.navParams.get('report');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EquipmentDamageReportDetailPage');
  }

	editDamageReport(report){
		this.navCtrl.push('ConstructionsiteReportDamagePage', {item: this.report.getParentItem(), report:this.report});

	}

	presentDamageReportDeleteActionsheet(report: DamageReport){// {{{
		let actionSheet = this.actionSheetCtrl.create({
			title: 'Schadensbericht löschen?',
			buttons: [
				{
					text: 'Ja',
					handler: () => {
						this.deleteDamageReport(report);
					}
				},
				{
					text: 'Nein',
					role: 'cancel'
				}
			]
		});
		actionSheet.present();
	}// }}}

	deleteDamageReport(report: DamageReport){
// 		let item = report.getParentItem();
// 		item.deleteDamageReport(report.getId());
		this.navCtrl.pop();
	}

}
