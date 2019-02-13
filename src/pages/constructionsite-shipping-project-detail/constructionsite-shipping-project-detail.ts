import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

import { ConstructionsiteShippingProjectEditItemsPage } from '../constructionsite-shipping-project-edit-items/constructionsite-shipping-project-edit-items';

import { ConstructionsiteShippingProvider } from '../../providers/constructionsite-shipping/constructionsite-shipping'

import { ShippingProject } from '../../classes/equipment/shipping-project';


/**
 * Generated class for the ConstructionsiteShippingProjectDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-constructionsite-shipping-project-detail',
  templateUrl: 'constructionsite-shipping-project-detail.html',
})
export class ConstructionsiteShippingProjectDetailPage {

	project: ShippingProject;
	projData: any;

	constructor(public navCtrl: NavController, public navParams: NavParams,
		public shippingProvider: ConstructionsiteShippingProvider,
		public actionSheetCtrl: ActionSheetController
	) {
	  this.project = this.navParams.get('project');
	  this.setProjectData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstructionsiteShippingProjectDetailPage');
  }


	setItems(){
		this.navCtrl.push(ConstructionsiteShippingProjectEditItemsPage, {project: this.project});
	}
	setProjectData(){
		this.projData = {origin:this.project.getOriginName(), destination:this.project.getDestinationName()};
	}
	updateProject(){
		this.project.setOrigin(this.projData.origin);
		this.project.setDestination(this.projData.destination);
	}

	saveProject(){
		this.updateProject();
		this.navCtrl.pop();
	}

	presentActionSheet(){
		let actionSheet = this.actionSheetCtrl.create({
			title: 'Projekt beantragen?',
// 			subTitle: 'Projektübersicht:',
			buttons: [
				{
					text: 'OK',
					handler: () => {
						this.submitShippingProject();
					}
				},
				{
					text: 'Abbrechen',
					role: 'cancel'
				}
			]
		});
		actionSheet.present();
	}

	submitShippingProject(){
		this.updateProject();

	}


}
