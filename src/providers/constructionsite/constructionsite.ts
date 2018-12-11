import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as Rx from "rxjs";

//PROVIDERS
import { AuthServiceProvider } from '../auth-service/auth-service';
import { GlobalsProvider } from '../globals/globals'
import { WeatherProvider } from '../weather/weather'
import { TimeProvider } from '../time/time'
import { GeolocationProvider } from '../geolocation/geolocation'

//CLASSES
import { Worker } from '../../classes/constructionsite/worker'
import { WorkerTeam } from '../../classes/constructionsite/worker-team'
import { EquipmentItem } from '../../classes/constructionsite/equipment-item'
import { EquipmentItemList } from '../../classes/constructionsite/equipment-item-list'
import { Contact } from '../../classes/constructionsite/contact'
import { ContactList } from '../../classes/constructionsite/contact-list'
import { Constructionsite } from '../../classes/constructionsite/constructionsite'
import { DailyReport } from '../../classes/constructionsite/dailyreport';

/*
  Generated class for the ConstructionsiteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class ConstructionsiteProvider {

	private constructionsite: Constructionsite;
	private dailyReport: DailyReport;
	private events: any;
	private damagereports: any;
	loadData: any;
	loadDataStatus:any;

	constructor(public http: HttpClient,  // {{{
		public weather: WeatherProvider, 
		private auth: AuthServiceProvider, 
		public globals: GlobalsProvider, 
		public time: TimeProvider, 
		public location: GeolocationProvider) 
	{
		console.log('Hello ConstructionsiteProvider Provider');
		this.loadDataStatus = {consiteData: false, weather: false};
		this.loadData = new Rx.BehaviorSubject(this.loadDataStatus); //use BehaviorSubject instead of Observable, as it emits last value on subscribe
	}// }}}

	public initialize(id){// {{{
		console.log("INITIALIZING CONSITE PROVIDER FOR ID=" + id);
		this.constructionsite= new Constructionsite();
		this.events = [];
		this.damagereports= [];
		this.constructionsite.setId(id);
	}// }}}

	getConstructionsite(){// {{{
		return this.constructionsite;
	}// }}}
	getWeather(){// {{{
		return this.weather;
	}// }}}

	loadDataUpdates(){// {{{
		return this.loadData;
	}// }}}
	checkLoadDataCompleted(){// {{{
		this.loadDataUpdates().subscribe(data => {
			console.log("checking completion for: ", data);
			if(data.consiteData && data.weather){
				console.log("LOADING CONSTRUCTIONSITE DATA COMPLETED, closing observable");
				this.loadData.complete();
			}
		},
			err => {console.log(err);},
			() => {});
	}// }}}

	loadConstructionsiteData() {// {{{
		console.log("LOADING CONSITE DATA");
		let url = this.globals.serverPhpScriptsUrl + "get_consite_info.php?token=" + this.auth.getUserInfo().getToken();
		console.log("URL: " + url);
		console.log(this.http);
		this.http.get(url)
			.subscribe(data => {
				console.log("CONSITE INFO DATA:", data);
				this.setMeta(data['meta']);
				this.setLocation(data['location']);
				this.setWorkerTeam(data['personal_arr']);
				this.setEquipmentItemList(data['equipment_arr']);
				this.setContactList(data['contacts_arr']);
			},
			err => {
				console.log(err);
			},
			() => {
				console.log("consite data loading completed");
				this.loadDataStatus.consiteData = true;
				this.loadData.next(this.loadDataStatus);
			});
	}// }}}
	private setMeta(data){// {{{
		this.constructionsite.description = data.description;
	}// }}}
	private setLocation(data){// {{{
		this.location.setLocationData(data);
	}// }}}
	private setWorkerTeam(data){// {{{
		this.constructionsite.workerTeam.setData(data);
	}// }}}
	private setEquipmentItemList(data){// {{{
		this.constructionsite.equipmentItemList.setData(data);
	}// }}}
	private setContactList(data){// {{{
		this.constructionsite.contactList.setData(data);
	}// }}}

	loadWeatherData(){// {{{
		this.loadDataUpdates().subscribe(
			loadingStatus => { //{{{
				if(loadingStatus.consiteData && !loadingStatus.weather){
					console.log("LOADING WEATHER DATA");
					//here we assume that location has been corectly set previously
					console.log("WEATHER LOCATION: ", this.location);
					this.weather.loadWeatherData(this.location.lat, this.location.lon);
					this.weather.loadingUpdates()
						.subscribe(hasLoaded => {
							if(hasLoaded){
								this.loadDataStatus.weather = true;
								this.loadData.next(this.loadDataStatus);
							}
						},
						err => {
						});
				}
			}, //}}}
			err => {},
			() => {});
	}// }}}

	isGeolocationValid(){// {{{
		return this.location.checkGeolocationValidityUpdates();
	}// }}}

	public getPolierCount(){// {{{
		return this.constructionsite.workerTeam.getPolierCount();
	}// }}}
	public getMaschinistCount(){// {{{
		return this.constructionsite.workerTeam.getMaschinistCount();
	}// }}}
	public getFacharbeiterCount(){// {{{
		return this.constructionsite.workerTeam.getFacharbeiterCount();
	}// }}}
	public getHilfsarbeiterCount(){// {{{
		return this.constructionsite.workerTeam.getHilfsarbeiterCount();
	}// }}}
	public getAllWorkersCount(){// {{{
		return this.constructionsite.workerTeam.getNumWorkers();
	}// }}}

	public getRamCount(){// {{{
		return this.constructionsite.equipmentItemList.getRamCount();
	}// }}}
	public getCraneCount(){// {{{
		return this.constructionsite.equipmentItemList.getCraneCount();
	}// }}}
	public getPumpCount(){// {{{
		return this.constructionsite.equipmentItemList.getPumpCount();
	}// }}}
	public getOtherCount(){// {{{
		return this.constructionsite.equipmentItemList.getOtherCount();
	}// }}}

	public getWorkerTeamMembers(){// {{{
		return this.constructionsite.workerTeam.getMembers();
	}// }}}
	public getContactList(){// {{{
		return this.constructionsite.contactList.items;
	}// }}}

	public generateDailyReport(){// {{{
		this.dailyReport = new DailyReport();
		this.dailyReport.constructionsite.id= this.constructionsite.id;
		this.dailyReport.constructionsite.description = this.constructionsite.description;

		this.dailyReport.timestamp.calendarWeek = this.time.getCurrentCalendarWeek();
		this.dailyReport.timestamp.date= this.time.getDateStr();
			
		this.dailyReport.weatherReport = {time: this.weather.time, 
			temperatureDegC: this.weather.temperatureDegC, 
			conditions: this.weather.precipitation + "mm, " + this.weather.cloudCoverPercent + "% Bedeckung"
		};

		this.dailyReport.timeReport = {countPolier: -1, countPolierHours: -1, 
			countMaschinist: -1, countMaschinistHours: -1, 
			countFacharbeiter: -1, countFacharbeiterHours: -1,
			countHilfsarbeiter: -1, countHilfsarbeiterHours: -1,
		};

		this.dailyReport.workDoneArr = [];
		for (let i=0; i<3; i++){
			let job = {id: i+1, title: "Rammen", commentary: "--"};
			this.dailyReport.workDoneArr.push(job);
		}

		this.dailyReport.eventArr = [];
		for (let i=0; i<3; i++){
			let event = {id: i+1, title: "Besuch Bauleiter", commentary: "--"};
			this.dailyReport.eventArr.push(event);
		}

	}

	public getDailyReport(){
		return this.dailyReport;
	}// }}}

	public addEvent(event){// {{{
		this.events.push(event);
	}// }}}
	public getEvents(){// {{{
		return this.events;
	}// }}}
	public getNumEvents(){// {{{
		return this.events.length;
	}// }}}

	public getNumDamageReports(){
		return this.damagereports.length;
	}

}
