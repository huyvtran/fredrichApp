import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
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

	loading: Loading;
	shippingProjects: any;
	constructor(
		public navCtrl: NavController, public navParams: NavParams, 
		public loadingCtrl: LoadingController,
		public shippingProvider: ConstructionsiteShippingProvider
	) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstructionsiteShippingProjectsOverviewPage');
	  this.shippingProjects = this.shippingProvider.getShippingProjects();
	  this.showLoading();
  }

	startNewProject(){
		this.shippingProvider.createNewShippingProject()
			.then(project => {
				console.log(project);
				this.navCtrl.push(ConstructionsiteShippingProjectDetailPage, {project: project});
			})
			.catch(err => {
				console.log(JSON.stringify(err));
			})
	}

	editProject(project: ShippingProject){
		this.navCtrl.push(ConstructionsiteShippingProjectDetailPage, {project: project});
	}

	showLoading() {// {{{
		this.loading = this.loadingCtrl.create({
			content: 'Bitte warten...',
			dismissOnPageChange: true
		});
		this.loading.present();
	}// }}}


}
