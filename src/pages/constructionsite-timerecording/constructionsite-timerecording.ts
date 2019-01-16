import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';

import { ConstructionsiteProvider } from '../../providers/constructionsite/constructionsite';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TelephoneProvider } from '../../providers/telephone/telephone';

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
	phoneNr:any;
	calleeStr:any;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public consiteProv: ConstructionsiteProvider, 
		private auth: AuthServiceProvider, 
		private telephone: TelephoneProvider, 
		public actionSheetCtrl: ActionSheetController
	) {
	  this.createWorktimes();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstructionsiteTimerecordingPage');
		console.log(this.consiteProv.getWorkerTeamMembers());
  }

	ionViewWillLeave(){
		console.log(this.consiteProv.getWorkerTeamMembers());
	}

	itemSelected(worker){
// 		this.navCtrl.push(ConstructionsiteWorkerDetailPage, {worker: worker});
	}

	createWorktimes(){// {{{
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
// 		console.log(this.worktimeStartSelect);
	}// }}}

	public onSelectClicked (): void {// {{{
		const options: HTMLCollectionOf<Element> = document.getElementsByClassName('alert-tappable alert-radio') // These classes come from the generated elements for the ion-select/ion-option
		setTimeout(() => {
			let i: number = 0;
			const len: number = options.length;
			for (i; i < len; i++) {
				if ((options[i] as HTMLElement).attributes[3].nodeValue === 'true') {
					let scrollIndex = Math.min(i+2, len-1);
					options[scrollIndex].scrollIntoView({ block: 'end', behavior: 'instant' });
				}
			}
		}, 500) // Leave enough time for the popup to render
	}// }}}
// 	public onSelectClicked(selectButton: Select): void {{{{
//     const options: HTMLCollectionOf<Element> = document.getElementsByClassName('alert-tappable alert-radio'); // These classes come from the generated elements for the ion-select/ion-option
// 		console.log(selectButton);
// 		console.log(options);
//     (<any>selectButton._overlay).didEnter.subscribe(
//       () => {
//         //Give a one cycle delay just to run this just after the didEnter has been called
//         setTimeout(() => {
//           let i: number = 0;
//           const len: number = options.length;
//           for (i; i < len; i++) {
//             if ((options[i] as HTMLElement).attributes[3].nodeValue === 'true') {
//               options[i].scrollIntoView({ block: 'end', behavior: 'instant' });
//             }
//           }
//         });
//       }
//     );
//   }}}}
	
	callWorker(worker){
		let params = {calleeStr: worker.name, phoneNr: worker.phoneNr};
		this.telephone.presentActionSheetPhone(params);
	}

}
