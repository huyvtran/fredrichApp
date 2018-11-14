import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.workers = [{id: 0, name: "Meyer", firstName: "Hans"},
			{id: 1, name: "Schmidt", firstName: "Georg"},
			{id: 2, name: "Mueller", firstName: "Franz"},
			{id: 3, name: "Becker", firstName: "Guenther"}
	  ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstructionsiteTimerecordingPage');
  }

	itemSelected(worker){

	}

}
