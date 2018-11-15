import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorehouseOverviewPage} from '../storehouse-overview/storehouse-overview';
import { StorehouseInventoryPage} from '../storehouse-inventory/storehouse-inventory';
import { StorehouseLogisticsPage} from '../storehouse-logistics/storehouse-logistics';


/**
 * Generated class for the StorehousePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-storehouse',
  templateUrl: 'storehouse.html',
})
export class StorehousePage {

	tab1Root = StorehouseOverviewPage;
	tab2Root = StorehouseInventoryPage;
	tab3Root = StorehouseLogisticsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StorehousePage');
  }

}
