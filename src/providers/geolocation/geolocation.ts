import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import {Observable} from 'rxjs/Observable';
import * as Rx from "rxjs";

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

	constructor(public http: HttpClient, private geolocation: Geolocation) {
		console.log('Hello GeolocationProvider Provider');
		this.setDefaults();
		this.validity = new Rx.BehaviorSubject(this.isGeolocationValid());

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
		 // resp.coords.latitude
		 // resp.coords.longitude
			this.validity.next(this.isGeolocationValid());
		}).catch((error) => {
		  console.log('Error getting location', error);
		});
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
		//TODO: check: hasOwnProperty();
// 		this.street = data.street;
// 		this.streetNr = data.streetNr;
// 		this.zipcode = data.zipcode;
		this.town = data.town;
		this.country = data.country;
		this.lat = data.lat; //XXX for testing
		this.lon = data.lon;
		this.validity.next(this.isGeolocationValid());
	}// }}}

	checkGeolocationValidityUpdates(){// {{{
		return this.validity;
	}// }}}

	isGeolocationValid(): boolean {
		let latNr = Number(this.lat), lonNr = Number(this.lon);
		console.log("latNr: ", latNr, "; lonNr: ", lonNr);
		let isValid = (this.lat.length > 0) && (this.lon.length > 0) 
			&& (latNr >=-90) && (latNr <=90) 
			&& (lonNr > -180) && (lonNr <= 180);
		return isValid;
	}

// 	triggerGeolocationValidity(){
// 		this.validityObserver.next(this.isGeolocationValid());
// 	}
	

}
