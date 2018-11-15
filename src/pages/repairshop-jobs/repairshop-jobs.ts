import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RepairshopJobsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-repairshop-jobs',
  templateUrl: 'repairshop-jobs.html',
})
export class RepairshopJobsPage {

	jobs:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.jobs= [{id: 0, inCharge: "Meyer, G.", toBeRepaired: "Ramme CX900"},
			{id: 1, inCharge: "Schmidt, G.", toBeRepaired: "Ramme CX300"},
			{id: 2, inCharge: "Werner, G.", toBeRepaired: "Ramme CX800"},
			{id: 3, inCharge: "Meyer, G.", toBeRepaired: "Ramme LH1200"}
	  ];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepairshopJobsPage');
  }

	itemSelected(job){

	}

}
