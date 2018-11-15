import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RepairshopOverviewPage} from '../repairshop-overview/repairshop-overview';
import { RepairshopJobsPage} from '../repairshop-jobs/repairshop-jobs';
import { RepairshopEquipmentPage} from '../repairshop-equipment/repairshop-equipment';


/**
 * Generated class for the RepairshopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-repairshop',
  templateUrl: 'repairshop.html',
})
export class RepairshopPage {

	tab1Root = RepairshopOverviewPage;
	tab2Root = RepairshopJobsPage;
	tab3Root = RepairshopEquipmentPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepairshopPage');
  }

}
