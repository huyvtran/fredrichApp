import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConstructionsitePage } from '../constructionsite/constructionsite';
import { RepairshopPage } from '../repairshop/repairshop';
import { StorehousePage } from '../storehouse/storehouse';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

	openConstructionsitePage(){
		this.navCtrl.push(ConstructionsitePage);
	}

	openRepairshopPage(){
		this.navCtrl.push(RepairshopPage);
	}

	openStorehousePage(){
		this.navCtrl.push(StorehousePage);
	}

	openSettingsPage(){
		this.navCtrl.push(SettingsPage);
	}

}
