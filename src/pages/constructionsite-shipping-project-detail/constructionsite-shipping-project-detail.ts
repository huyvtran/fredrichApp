import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ConstructionsiteShippingProjectEditItemsPage } from '../constructionsite-shipping-project-edit-items/constructionsite-shipping-project-edit-items';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
	  this.project = this.navParams.get('project');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstructionsiteShippingProjectDetailPage');
  }


	addItems(){
		this.navCtrl.push(ConstructionsiteShippingProjectEditItemsPage, {project: this.project});
	}


}
