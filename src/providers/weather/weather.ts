import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import { GlobalsProvider } from '../globals/globals'

/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherProvider {

	weatherdata: any;
	date: string;
	time: string;
	temperatureDegC: string;
	cloudCoverPercent: string;
	windSpeedKmH: string;
	maxWindSpeedKmH: string;
	precipitation: string; //TODO: check unit

	loadingStatus:any;
	loadingStatusObserver:any;

	constructor(public http: HttpClient, public globals: GlobalsProvider) {
		console.log('Hello WeatherProvider Provider');
		this.loadingStatus = Observable.create(observer => {
			this.loadingStatusObserver = observer;
		});
	}

	loadWeatherData(lat, lon){
		let url = this.globals.serverPhpScriptsUrl + 'wetter/get.php?breite=' + lat + '&laenge=' + lon;
		console.log("WEATHER URL:", url);
		this.http.get(url)
			.subscribe(data => {
// 				console.log(data);
				this.date= data['datum'];
				this.time= data['uhrzeit'];
				this.cloudCoverPercent= data['wolkenbedeckung'];
				this.windSpeedKmH= data['wind'];
				this.maxWindSpeedKmH= data['max_wind'];	
				this.temperatureDegC = data['temp'];	
				this.precipitation = data['niederschlag'];
			},
			err => {this.loadingStatusObserver.next(false);},
			() => {
				this.loadingStatusObserver.next(true);
				this.loadingStatusObserver.complete();
			});
	}


	loadingUpdates(){
		return this.loadingStatus;
	}

	getTemperature(){// {{{
		return this.temperatureDegC;
	}// }}}
	getCloudcover(){// {{{
		return this.cloudCoverPercent;
	}// }}}
	getWindSpeedAvg(){// {{{
		return this.windSpeedKmH;
	}// }}}
	getWindSpeedMax(){// {{{
		return this.maxWindSpeedKmH;
	}// }}}
	getPrecipitation(){// {{{
		return this.precipitation;
	}// }}}

}
