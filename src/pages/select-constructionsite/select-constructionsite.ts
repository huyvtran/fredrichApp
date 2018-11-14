import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConstructionsitePage } from '../constructionsite/constructionsite';

/**
 * Generated class for the SelectConstructionsitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-constructionsite',
  templateUrl: 'select-constructionsite.html',
})
export class SelectConstructionsitePage {

	constructionsites:any;
	favoriteConstructionsites:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
	  this.constructionsites = [{id: 0, name: "Baustelle 1", location: "Bremerhaven, DE"},
		  {id: 1, name: "Baustelle 2", location: "Wismar, DE"},
		  {id: 2, name: "Baustelle 3", location: "Hamburg, DE"}];
	  this.favoriteConstructionsites=[this.constructionsites[1]];
	  console.log(this.constructionsites);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectConstructionsitePage');
  }
	itemSelected(constructionsite){
		this.navCtrl.push(ConstructionsitePage, {constructionsite: constructionsite});
	}

}
