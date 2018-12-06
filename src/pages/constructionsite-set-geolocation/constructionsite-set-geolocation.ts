import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { GeolocationProvider } from '../../providers/geolocation/geolocation'
import { ConstructionsiteProvider } from '../../providers/constructionsite/constructionsite';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public location: GeolocationProvider, private consiteProv: ConstructionsiteProvider, private alertCtrl: AlertController) {
				
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstructionsiteSetGeolocationPage');
  }

	setGeolocation(){
		this.location.setGeolocation();
		this.location.loadingStatusUpdates()
			.subscribe(hasLoaded => {
				if(hasLoaded){
					console.log("GEOCOORDS HAVE LOADED");
					console.log(this.location);
					this.presentAlertSuccess();
					this.navCtrl.pop();
					this.location.postGeolocation();
				} else {
					console.log("COULD NOT LOAD GEOCOORDS");
					this.presentAlertFail();
					this.navCtrl.pop();
				}
			},
			err => {
		
			});

	}

	presentAlertSuccess() {
		let alert = this.alertCtrl.create({
			title: 'Geodaten wurden gesetzt.',
			subTitle: "Neue Koordinaten: " + this.location.getLatStr(3) + ', ' + this.location.getLonStr(3),
			buttons: ['OK']
		});
		alert.present();
	}

	presentAlertFail() {
		let alert = this.alertCtrl.create({
			title: "Geokoordinaten konnten nicht abgefragt werden.",
			subTitle: "Bitte in Einstellungen Zugriff auf Standort gew&auml;hren",
			buttons: ['OK']
		});
		alert.present();
	}



}
