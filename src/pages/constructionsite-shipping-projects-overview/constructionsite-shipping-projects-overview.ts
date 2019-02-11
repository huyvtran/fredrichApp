import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConstructionsiteShippingProvider } from '../../providers/constructionsite-shipping/constructionsite-shipping'
import { ConstructionsiteShippingProjectDetailPage } from '../constructionsite-shipping-project-detail/constructionsite-shipping-project-detail';
import { ShippingProject } from '../../classes/equipment/shipping-project';


/**
 * Generated class for the ConstructionsiteShippingProjectsOverviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-constructionsite-shipping-projects-overview',
  templateUrl: 'constructionsite-shipping-projects-overview.html',
})
export class ConstructionsiteShippingProjectsOverviewPage {

	constructor(
		public navCtrl: NavController, public navParams: NavParams, 
		public shippingProvider: ConstructionsiteShippingProvider
	) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstructionsiteShippingProjectsOverviewPage');
  }

	startNewProject(){
		let project = this.shippingProvider.createNewShippingProject();
		this.navCtrl.push(ConstructionsiteShippingProjectDetailPage, {project: project});
	}

	editProject(project: ShippingProject){
		this.navCtrl.push(ConstructionsiteShippingProjectDetailPage, {project: project});
	}

}
