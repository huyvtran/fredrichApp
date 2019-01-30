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
import { ConstructionsiteContactsProvider } from '../constructionsite-contacts/constructionsite-contacts'
import { ConstructionsiteEquipmentProvider } from '../constructionsite-equipment/constructionsite-equipment'
import { ConstructionsiteWorkersProvider } from '../constructionsite-workers/constructionsite-workers'
import { FileHandlerProvider } from '../file-handler/file-handler'

//CLASSES
import { Worker } from '../../classes/constructionsite/worker'
import { WorkerTeam } from '../../classes/constructionsite/worker-team'
import { EquipmentItem } from '../../classes/equipment/equipment-item'
import { EquipmentItemList } from '../../classes/equipment/equipment-item-list'
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
	private damageReports: any;
	loadPrimaryData: any;
	loadPrimaryDataStatus:any;
	loadSecondaryData: any;
	loadSecondaryDataStatus:any;
	loadAllData: any;
	loadAllDataStatus:any;

	constructor(public http: HttpClient,  // {{{
		public weather: WeatherProvider, 
		private auth: AuthServiceProvider, 
		public globals: GlobalsProvider, 
		public time: TimeProvider, 
		public location: GeolocationProvider,
		public fileHandler: FileHandlerProvider,
		public contacts: ConstructionsiteContactsProvider,
		public equipment: ConstructionsiteEquipmentProvider,
		public workers: ConstructionsiteWorkersProvider
	) 
	{
		console.log('Hello ConstructionsiteProvider Provider');
		this.loadPrimaryDataStatus = false;
		this.loadPrimaryData = new Rx.BehaviorSubject(this.loadPrimaryDataStatus); //use BehaviorSubject instead of Observable, as it emits last value on subscribe

		this.loadSecondaryDataStatus = {weather: false, contacts: false, equipment: false, workers: false}; 
		this.loadSecondaryData = new Rx.BehaviorSubject(this.loadSecondaryDataStatus); //use BehaviorSubject instead of Observable, as it emits last value on subscribe

		this.loadAllDataStatus = false;
		this.loadAllData = new Rx.BehaviorSubject(this.loadAllDataStatus); //use BehaviorSubject instead of Observable, as it emits last value on subscribe
	}// }}}

	public initialize(id){// {{{
		console.log("INITIALIZING CONSITE PROVIDER FOR ID=" + id);
		this.constructionsite= new Constructionsite();
		this.events = [];
// 		this.damageReports= [];
		this.constructionsite.setId(id);
	}// }}}

	//LOADING AND POPULATING CONSITE PROVIDER
	loadConstructionsiteData() {// {{{
		this.loadPrimaryConsiteData();
		this.loadPrimaryDataUpdates()
			.subscribe(hasCompleted => {
				if(hasCompleted){
					this.loadSecondaryConsiteData();
					this.configure();
				}
			});
		this.checkAllLoadingCompleted();
	}// }}}
	loadPrimaryConsiteData(){// {{{
		let url = this.globals.serverPhpScriptsUrl + "get_consite_info.php?token=" + this.auth.getUserInfo().getToken();
		this.http.get(url)
			.subscribe(data => {
				console.log("CONSITE INFO DATA:", data);
				this.setMeta(data['meta']);
				this.setLocation(data['location']);
				//XXX: TODO: move below items to separate data load modules
// 				this.setWorkerTeam(data['personal_arr']);
// 				this.setEquipmentItemList(data['equipment_arr']);

				//broadcast completion
				this.loadPrimaryDataStatus = true;
				this.loadPrimaryData.next(this.loadPrimaryDataStatus);
				this.loadPrimaryData.complete();
			},
			err => {console.log(err);},
			() => {
			});
	}// }}}
	loadSecondaryConsiteData(){// {{{
		this.loadWorkersData();
		this.loadEquipmentData();
		this.loadContactsData();
		this.loadWeatherData();
	}// }}}
	public configure(){// {{{
		console.log("CONFIGURING CONSITE PROVIDER");
		let subDir = this.constructionsite.getId();
		this.fileHandler.configure(subDir);
	}// }}}

	//LOAD DATA CHECKS
	loadPrimaryDataUpdates(){// {{{
		return this.loadPrimaryData;
	}// }}}
	loadSecondaryDataUpdates(){// {{{
		return this.loadSecondaryData;
	}// }}}
	loadAllCompletedUpdates(){// {{{
		return this.loadAllData;
	}// }}}
	checkAllLoadingCompleted(){// {{{
		this.loadSecondaryDataUpdates()
		.subscribe(loadingStatus => {
			let allLoadingCompleted = (loadingStatus.weather && loadingStatus.contacts && loadingStatus.equipment && loadingStatus.workers);
			if(allLoadingCompleted){
				this.loadAllData.next(true);
				this.loadPrimaryData.complete();
				this.loadSecondaryData.complete();
				this.loadAllData.complete();
			}
		});
	}// }}}

	//SECONDARY DATA LOADING ROUTINES
	loadWeatherData(){// {{{
		this.isGeolocationValid()
		.subscribe(isValid => {
			if(isValid){
				this.loadWeatherDataHelper();
			} else {
				//TODO: load data of constructionsite
// 				this.location.updateGeolocation(); 
// 				this.location.loadingStatus()
// 				.subscribe(hasCompleted => {
// 					if(hasCompleted){
// 						this.loadWeatherDataHelper();
// 					}
// 				});
			}
		});
	}// }}}
	loadWeatherDataHelper(){// {{{
		console.log("LOADING WEATHER DATA");
		this.weather.loadWeatherData(this.location.lat, this.location.lon);
		this.weather.loadingUpdates()
			.subscribe(hasLoaded => {
				if(hasLoaded){
					this.loadSecondaryDataStatus.weather = true;
					this.loadSecondaryData.next(this.loadSecondaryDataStatus);
				}
			},
			err => {
			});
	}// }}}
	public loadContactsData(){// {{{
		console.log("LOADING CONTACTS DATA");
		this.contacts.loadContactsData();
		this.contacts.loadingUpdates()
			.subscribe(hasLoaded => {
				if(hasLoaded){
					this.loadSecondaryDataStatus.contacts= true;
					this.loadSecondaryData.next(this.loadSecondaryDataStatus);
				}
			},
			err => {
			});
	}// }}}
	public loadEquipmentData(){// {{{
		console.log("LOADING EQUIPMENT DATA");
		this.equipment.loadEquipmentData();
		this.equipment.loadingUpdates()
			.subscribe(hasLoaded => {
				if(hasLoaded){
					this.loadSecondaryDataStatus.equipment= true;
					this.loadSecondaryData.next(this.loadSecondaryDataStatus);
				}
			},
			err => {
			});
	}// }}}
	public loadWorkersData(){// {{{
		console.log("LOADING WORKERS DATA");
		this.workers.loadWorkersData();
		this.workers.loadingUpdates()
			.subscribe(hasLoaded => {
				if(hasLoaded){
					this.loadSecondaryDataStatus.workers= true;
					this.loadSecondaryData.next(this.loadSecondaryDataStatus);
				}
			},
			err => {
			});
	}// }}}

	//CONSITE SPECIFICS
	getConstructionsite(){// {{{
		return this.constructionsite;
	}// }}}
	getWeather(){// {{{
		return this.weather;
	}// }}}
	getConstructionsiteId(){// {{{
		return this.constructionsite.getId();
	}// }}}

	private setMeta(data){// {{{
		this.constructionsite.description = data.description;
	}// }}}
	private setLocation(data){// {{{
		this.location.setLocationData(data);
	}// }}}
// 	private setWorkerTeam(data){// {{{
// 		this.constructionsite.workerTeam.setData(data);
// 	}// }}}
// 	private setEquipmentItemList(data){// {{{
// // 		this.constructionsite.equipmentItemList.setData(data);
// 		this.equipment.setEquipmentItemListData(data);
// 	}// }}}
// 	private setContactList(data){// {{{
// 		this.constructionsite.contactList.setData(data);
// 	}// }}}

	//GEOLOCATION
	isGeolocationValid(){// {{{
		return this.location.checkGeolocationValidityUpdates();
	}// }}}

	//WORKERS
// 	public getPolierCount(){// {{{
// 		return this.constructionsite.workerTeam.getPolierCount();
// 	}// }}}
// 	public getMaschinistCount(){// {{{
// 		return this.constructionsite.workerTeam.getMaschinistCount();
// 	}// }}}
// 	public getFacharbeiterCount(){// {{{
// 		return this.constructionsite.workerTeam.getFacharbeiterCount();
// 	}// }}}
// 	public getHilfsarbeiterCount(){// {{{
// 		return this.constructionsite.workerTeam.getHilfsarbeiterCount();
// 	}// }}}
// 	public getAllWorkersCount(){// {{{
// 		return this.constructionsite.workerTeam.getNumWorkers();
// 	}// }}}
	public getWorkerTeamMembers(){// {{{
		return this.workers.getTeamMembers();
	}// }}}
// 	public getTodaysWorkerHoursByRole(role:string):number{// {{{
// 		let hours=0;
// 		let workers = this.getWorkerTeamMembers();
// 		for (let worker of workers) {
// 			if(worker.getRole() === role){
// 				hours = hours + worker.getHoursWorkedToday();
// 			}
// 		}
// 		return hours;
// 	}// }}}

	//EQUIPMENT
	public getEquipment(){// {{{
		return this.equipment.getEquipmentItemList();
	}// }}}

	//CONTACTS
	public getContacts(){// {{{
		return this.contacts.getContacts();
	}// }}}

	//DAILY REPORT
	public generateDailyReport(){// {{{
		this.dailyReport = new DailyReport();
		this.dailyReport.constructionsite.id= this.getConstructionsiteId();
		this.dailyReport.constructionsite.description = this.constructionsite.description;

		this.dailyReport.timestamp.calendarWeek = this.time.getCurrentCalendarWeek();
		this.dailyReport.timestamp.date= this.time.getDateStr();
			
		this.dailyReport.weatherReport = {time: this.weather.time, 
			temperatureDegC: this.weather.temperatureDegC, 
			conditions: this.weather.precipitation + "mm, " + this.weather.cloudCoverPercent + "% Bedeckung"
		};

		this.generateWorkersTimeReport();
		this.generateWorkersTimeReportTotals();

		this.dailyReport.workDoneArr = [];
		for (let i=0; i<3; i++){
			let job = {id: i+1, title: "Rammen", commentary: "--"};
			this.dailyReport.workDoneArr.push(job);
		}

		this.dailyReport.eventArr = this.getEvents();

	}// }}}
	private generateWorkersTimeReport(){// {{{
		let roles = this.getAvailableRoles();
		let timeReportArr = [];
		for (let role of roles){
			let timeReportRole = {role: role, roleStr:"", count:0, hourStart:"", hourEnd:"", numHours:0};
			timeReportRole.roleStr=this.getRoleStr(role);
			timeReportRole.count = this.workers.getPresentWorkerCountByRole(role);
			timeReportRole.hourStart = this.timeNum2Str(this.workers.getHourStartAvgByRole(role));
			timeReportRole.hourEnd = this.timeNum2Str(this.workers.getHourEndAvgByRole(role));
			timeReportRole.numHours= this.workers.getWorkerHoursByRoleToday(role);
			timeReportArr.push(timeReportRole);
		}
		this.dailyReport.workersTimeReport = timeReportArr;
		console.log("workers timereport:");
		console.log(this.dailyReport.workersTimeReport);
	}// }}}
	private generateWorkersTimeReportTotals(){// {{{
		let roles = this.getAvailableRoles();
		let totals ={numWorkersPresent:0, numHours:0}, 
			nwp=0, 
			numHours=0;
		for (let role of roles){
			nwp = nwp + this.workers.getPresentWorkerCountByRole(role);
			numHours = numHours + this.workers.getWorkerHoursByRoleToday(role);
		}
		totals.numWorkersPresent = nwp;
		totals.numHours = numHours;
		this.dailyReport.workersTimeReportTotals = totals;
		console.log(this.dailyReport.workersTimeReportTotals);
	}// }}}
	public getDailyReport(){// {{{
		return this.dailyReport;
	}// }}}

	//EVENTS
	public addEvent(event){// {{{
		this.events.push(event);
	}// }}}
	public getEvents(){// {{{
		return this.events;
	}// }}}
	public getNumEvents(){// {{{
		return this.events.length;
	}// }}}

	public addDamageReport(report){// {{{
		this.damageReports.push(report);
	}// }}}
	public getDamageReports(){// {{{
		return this.damageReports;
	}// }}}
	public getNumDamageReports(){// {{{
		return this.equipment.getNumDamageReports();
	}// }}}

	//UTILS
	getAvailableRoles(){
		return ["1Polier", "2Maschinist", "3Facharbeiter", "4Hilfsarbeiter"];
	}
	getRoleStr(role){// {{{
		let roleStr="";
		switch (role) {
			case "1Polier": {
				//statements;
				roleStr = "Polier";
				break;
			}
			case "2Maschinist": {
				//statements;
				roleStr = "Maschinist";
				break;
			}
			case "3Facharbeiter": {
				//statements;
				roleStr = "Facharbeiter";
				break;
			}
			case "4Hilfsarbeiter": {
				//statements;
				roleStr = "Hilfsarbeiter";
				break;
			}
			default: {
				roleStr = role;
				break;
			}
		}
		return roleStr;
	}// }}}
	timeNum2Str(time:number){// {{{
		let timeStr="";
		if(isNaN(time)){
			timeStr="";
		} else {
			var pad = "00";
			let hour = Math.floor(time);
			var hourStr= (pad+String(hour)).slice(-pad.length);	
			let min = (time - hour)*60;
			var minStr= (pad+String(min)).slice(-pad.length);	
			timeStr=hourStr + ":" + minStr;
		}
		return timeStr;
	}// }}}

}
