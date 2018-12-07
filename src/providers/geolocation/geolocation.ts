import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import {Observable} from 'rxjs/Observable';
import * as Rx from "rxjs";

import { GlobalsProvider } from '../globals/globals'
import { AuthServiceProvider } from '../auth-service/auth-service';

/*
  Generated class for the GeolocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class GeolocationProvider {

	street: string;
	streetNr: string;
	zipcode: string;
	town: string;
	country: string;
	lat: any;
	lon: any;
	validity: any;
	validityObserver:any;

	loadingStatus: any;
	loadingStatusObserver: any;

	constructor(public http: HttpClient, 
	private geolocation: Geolocation,
		private globals: GlobalsProvider,
		private auth: AuthServiceProvider) {
		console.log('Hello GeolocationProvider Provider');
		this.setDefaults();
		this.validity = new Rx.BehaviorSubject(this.isGeolocationValid());
		this.loadingStatus = Observable.create(observer => {
			this.loadingStatusObserver = observer;
		});

	}

	setDefaults(){
		this.street = "";
		this.streetNr = "";
		this.zipcode = "";
		this.town = "";
		this.country = "";
		this.lat ="";
		this.lon = "";
	}

	isLocationSet(){// {{{

	}// }}}

	setGeolocation(){// {{{
		this.geolocation.getCurrentPosition().then((resp) => {
			console.log(resp);
			this.lat = String(resp['coords'].latitude);
			this.lon= String(resp['coords'].longitude);
		 // resp.coords.latitude
		 // resp.coords.longitude
			this.loadingStatusObserver.next(true);
			this.loadingStatusObserver.complete();
			console.log("GEODATA SUCCESSFULLY SET")
			this.validity.next(this.isGeolocationValid());
		}).catch((error) => {
		  console.log('Error getting location', error);
			this.loadingStatusObserver.next(false);
		});
	}// }}}

	loadingStatusUpdates(){// {{{
		return this.loadingStatus;
	}// }}}

	watchGeolocation(){// {{{
		let watch = this.geolocation.watchPosition();
		watch.subscribe((data) => {
			console.log(data);
		 // data can be a set of coordinates, or an error (if an error occurred).
		 // data.coords.latitude
		 // data.coords.longitude
		});
	}// }}}

	setLocationData(data){// {{{
		console.log("Setting constructionsite location:", data);
		//TODO: check: hasOwnProperty();
// 		this.street = data.street;
// 		this.streetNr = data.streetNr;
// 		this.zipcode = data.zipcode;
		this.town = data.town;
		this.country = data.country;
		this.lat = data.lat; 
		this.lon = data.lon;
		this.validity.next(this.isGeolocationValid());
	}// }}}

	checkGeolocationValidityUpdates(){// {{{
		return this.validity;
	}// }}}

	isGeolocationValid(): boolean {// {{{
		let latNr = Number(this.lat), lonNr = Number(this.lon);
// 		console.log("latNr: ", latNr, "; lonNr: ", lonNr);
// 		console.log("1:",(this.lat.length > 0) && (this.lon.length > 0));
// 		console.log("1:",this.lat.length, this.lon.length);
// 		console.log("2:",(latNr >=-90) && (latNr <=90));
// 		console.log("3:",(lonNr >= -180) && (lonNr <= 180));
		let isValid = (this.lat.length > 0) && (this.lon.length > 0) 
			&& (latNr >=-90) && (latNr <=90) 
			&& (lonNr >= -180) && (lonNr <= 180);
		return isValid;
	}// }}}

	postGeolocation(){
		console.log("POSTING GEOLOCATION TO SERVER");
		console.log("LAT: " + this.lat + "; LON: " + this.lon);
		let url = this.globals.serverPhpScriptsUrl + "post_geo_data.php?token=" + this.auth.getUserInfo().getToken() + "&geo_breite=" + this.lat + "&geo_laenge=" + this.lon;
		this.http.get(url)
			.subscribe(data => {console.log(data)},
				err => console.log(err));
	}

	getLatStr(precision?: number){// {{{
		if(precision){
			//do nothing
		} else {precision = 3;}
		let str =""; 
		if(this.lat>=0.){
			str = String(Math.abs(Number(this.lat)).toFixed(precision)) + " N";
		} else {
			str = String(Math.abs(Number(this.lat)).toFixed(precision)) + " S";
		}
		return str;
	}// }}}

	getLonStr(precision?: number){// {{{
		if(precision){
			//do nothing
		} else {precision = 3;}
		let str =""; 
		if(this.lon>=0.){
			str = String(Math.abs(Number(this.lon)).toFixed(precision)) + " O";
		} else {
			str = String(Math.abs(Number(this.lon)).toFixed(precision)) + " W";
		}
		return str;
	}// }}}
// 	triggerGeolocationValidity(){
// 		this.validityObserver.next(this.isGeolocationValid());
// 	}
	

}
