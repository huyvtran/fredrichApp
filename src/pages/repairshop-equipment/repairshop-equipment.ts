import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RepairshopEquipmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-repairshop-equipment',
  templateUrl: 'repairshop-equipment.html',
})
export class RepairshopEquipmentPage {

	equipmentArr:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
	this.equipmentArr= [{id: 0, name: "Ramme CX900", state: "OK"},
			{id: 1, name: "Ramme CX300", state: "defekt"},
			{id: 2, name: "Ramme CX800", state: "defekt"},
			{id: 3, name: "Ramme LH1200", state: "OK"},
	  ];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepairshopEquipmentPage');
  }

	itemSelected(item){

	}

}
