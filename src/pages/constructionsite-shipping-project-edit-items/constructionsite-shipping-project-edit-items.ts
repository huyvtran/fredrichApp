import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShippingProject } from '../../classes/equipment/shipping-project';


/**
 * Generated class for the ConstructionsiteShippingProjectEditItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-constructionsite-shipping-project-edit-items',
  templateUrl: 'constructionsite-shipping-project-edit-items.html',
})
export class ConstructionsiteShippingProjectEditItemsPage {

	project: ShippingProject;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.project = this.navParams.get('project');
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstructionsiteShippingProjectEditItemsPage');
  }

}
