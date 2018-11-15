import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the StorehouseInventoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-storehouse-inventory',
  templateUrl: 'storehouse-inventory.html',
})
export class StorehouseInventoryPage {

	ramArr:any;
	itemArr:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
	  this.ramArr=[{id: 0, name: "CX900", state: "OK", location: "Gang3, Zeile 7"}, 
			{id: 1, name: "CX800", state: "OK", location: "Gang2, Zeile 7"},
			{id: 2, name: "CX700", state: "defekt", location: "Werkstatt"},
			{id: 3, name: "CX600", state: "OK", location: "Gang5, Zeile 7"}
	  ];
	  this.itemArr=[{id: 0, name: "Schraubenzieher", state: "OK", location: "Gang3, Zeile 7"}, 
			{id: 1, name: "Abstandsplatte", state: "OK", location: "Gang2, Zeile 7"},
			{id: 2, name: "Wehrkorb", state: "defekt", location: "Gang4, Zeile 7"},
			{id: 3, name: "Sonstiges", state: "OK", location: "Gang5, Zeile 7"}
	  ];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StorehouseInventoryPage');
  }

}
