import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SelectConstructionsitePage } from '../select-constructionsite/select-constructionsite';
import { RepairshopPage } from '../repairshop/repairshop';
import { StorehousePage } from '../storehouse/storehouse';
import { SettingsPage } from '../settings/settings';
import { LoginPage } from '../login/login';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	username = '';
	email = '';
	token = '';

  constructor(public navCtrl: NavController, private auth: AuthServiceProvider) {
		let info = this.auth.getUserInfo();
		this.username = info['name'];
		this.email = info['email'];
		this.token = info['token'];
  }

	openSelectConstructionsitePage(){
		this.navCtrl.push(SelectConstructionsitePage);
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

	public logout() {
	this.auth.logout().subscribe(succ => {
		this.navCtrl.setRoot('LoginPage')
	});
  }

}
