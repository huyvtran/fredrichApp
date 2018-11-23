import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ConstructionsiteTimerecordingPage } from '../constructionsite-timerecording/constructionsite-timerecording';
import { ConstructionsiteProvider } from '../../providers/constructionsite/constructionsite';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the ConstructionsiteOverviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-constructionsite-overview',
  templateUrl: 'constructionsite-overview.html',
})
export class ConstructionsiteOverviewPage {

	//TODO: wrap all counts etc in Constructionsite provider
	countPolier:number;
	countMaschinist:number;
	countFacharbeiter:number;
	countHilfsarbeiter:number;
	countAllWorkers:number;

	countRamm:number;
	countCrane:number;
	countPump:number;
	countOther:number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public consiteProv: ConstructionsiteProvider, private auth: AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstructionsiteOverviewPage');
// 	  this.consiteProv.loadConstructionsite();
// 	  this.getCountWorkers();
// 	  this.getCountEquipment();
  }

	getCountWorkers(){
		this.countPolier = 1;
		this.countMaschinist = 1;
		this.countFacharbeiter = 2;
		this.countHilfsarbeiter = 0;
		this.countAllWorkers = this.countPolier + this.countMaschinist + this.countFacharbeiter + this.countHilfsarbeiter;
	}

	getCountEquipment(){
		this.countRamm = 1
		this.countCrane = 2;
		this.countPump = 3;
		this.countOther = 0;
	}

	openWorkersPage(){
		this.navCtrl.push(ConstructionsiteTimerecordingPage);
	}

	openEquipmentPage(){

	}
	
	openWeatherPage(){

	}

	openConstructionsiteRemarkPage(){

	}
}
