import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GeolocationProvider } from '../../providers/geolocation/geolocation'

/**
 * Generated class for the ConstructionsiteSetGeolocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-constructionsite-set-geolocation',
  templateUrl: 'constructionsite-set-geolocation.html',
})
export class ConstructionsiteSetGeolocationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public location: GeolocationProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstructionsiteSetGeolocationPage');
  }

}
