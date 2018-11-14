import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ConstructionsiteEquipmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-constructionsite-equipment',
  templateUrl: 'constructionsite-equipment.html',
})
export class ConstructionsiteEquipmentPage {

	equipmentArr:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.equipmentArr= [{id: 0, name: "CX123", status: "operabel"},
			{id: 1, name: "LH456", status: "defekt"},
			{id: 2, name: "JB789", status: "operabel"}
	  ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstructionsiteEquipmentPage');
  }

	itemSelected(equipment){

	}

}
