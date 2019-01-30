import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController } from 'ionic-angular';

import { DamageReport } from '../../classes/equipment/damage-report'
import { ConstructionsiteEquipmentProvider } from '../../providers/constructionsite-equipment/constructionsite-equipment'

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
		private actionSheetCtrl: ActionSheetController,
		private toastCtrl: ToastController,
		public equipmentProvider: ConstructionsiteEquipmentProvider
	) {
		this.report = this.navParams.get('report');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EquipmentDamageReportDetailPage');
  }

	editDamageReport(report){// {{{
		this.navCtrl.push('ConstructionsiteReportDamagePage', {item: this.equipmentProvider.getDamageReportParentItem(report), report:this.report});
	}// }}}
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
	deleteDamageReport(report: DamageReport){// {{{
		let item = this.equipmentProvider.getDamageReportParentItem(report);
		let toastMessage = "";
		if(item.deleteDamageReport(report.getId())){
			toastMessage = "Schadensbericht gelöscht."
		} else {
			toastMessage = "Fehler beim Löschen des Schadensberichts."
		};
		const toast = this.toastCtrl.create({
			message: toastMessage,
			showCloseButton: true,
			position: 'top',
			closeButtonText: 'OK',
			duration:2000
		});
		toast.present();
		this.navCtrl.pop();
	}// }}}

}
