import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ConstructionsiteProvider } from '../../providers/constructionsite/constructionsite';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { ConstructionsiteWorkerDetailPage } from '../constructionsite-worker-detail/constructionsite-worker-detail';

/**
 * Generated class for the ConstructionsiteTimerecordingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-constructionsite-timerecording',
  templateUrl: 'constructionsite-timerecording.html',
})
export class ConstructionsiteTimerecordingPage {

	workers:any;
// 	hoursSelect:number;
// 	minuteSelect:number;
	worktimeStartSelect:any=[];
	worktimeEndSelect:any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public consiteProv: ConstructionsiteProvider, private auth: AuthServiceProvider) {
	  this.createWorktimes();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstructionsiteTimerecordingPage');
  }

	itemSelected(worker){
// 		this.navCtrl.push(ConstructionsiteWorkerDetailPage, {worker: worker});
	}

	createWorktimes(){
		let minutes=["00","15","30","45"];
		let hours=[];
		this.worktimeStartSelect=[];
		this.worktimeEndSelect=[];
		for(let h=0;h<24;h++){
			var pad = "00";
			var hourStr= (pad+String(h)).slice(-pad.length);	
			for(let minuteStr of minutes){
				let timeStr= hourStr + ":" + minuteStr;
				this.worktimeStartSelect.push(timeStr);
				this.worktimeEndSelect.push(timeStr);
			}
		}
		console.log(this.worktimeStartSelect);
	}
}
