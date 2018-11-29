import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthServiceProvider } from '../auth-service/auth-service';
import { GlobalsProvider } from '../globals/globals'
import { WeatherProvider } from '../weather/weather'
import { TimeProvider } from '../time/time'

/*
  Generated class for the ConstructionsiteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

class Worker {// {{{

	id: string;
	name: string;
	surname: string;
	phoneNr: string;
	email: string;
	role: string;
	schedule: any;
	timeWorkStart: string;
	timeWorkEnd

	constructor(){
		this.id = "";
		this.name = "";
		this.surname = "";
		this.phoneNr = "";
		this.email = "";
		this.role = "";
		this.schedule = {timeStart: "07:00", timeEnd: "16:00"};
	}

	//PUBLIC
	setData(data){// {{{
		this.id = data.id;
		this.name = data.name;
		this.surname = data.surname;
		this.phoneNr = data.phoneNr;
		this.email = data.email;
		this.role = data.role;
// 		this.schedule = ...
	}// }}}
	getRoleStr(){// {{{
		let roleStr="";
		switch (this.role) {
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
				roleStr = this.role;
				break;
			}
		}
		return roleStr;
	}// }}}

	//PRIVATE
}// }}}

class WorkerTeam {// {{{
	
	private members: any = [];

	//this is the team of workers working on the construction site
	constructor(){
		this.members = [];
	}
	
	setData(teamData: any) {
		this.setMembersFromArray(teamData);
    }
	//PUBLIC 
	public getWorker(id) : Worker {// {{{
		for (let worker of this.members){
			if(worker.id==id){return worker;}
			else {continue;}
		}
		console.log("WARNING: No worker with id: " + id + " found!");
		return null;
	}// }}}
	
	public isWorkerTeamMember(id) : boolean {// {{{
		for (let worker of this.members){
			if(worker.id==id){return true;}
			else {continue;}
		}
		return false;
	}// }}}

	public addMember(data){// {{{
		let worker = new Worker();
		worker.setData(data);
		this.members.push(worker);
	}// }}}

	public addMembersFromArray(teamData:any){// {{{
		 for (let data of teamData) {
			 this.addMember(data);
		 }
	}// }}}

	public setMembersFromArray(teamData:any) {// {{{
		this.clearTeam();
		this.addMembersFromArray(teamData);
	}// }}}

	public getMembers(){// {{{
		return this.members;
	}// }}}

	public getPolierCount(){// {{{
		return this.getRoleCount("1Polier");
	}// }}}

	public getMaschinistCount(){// {{{
		return this.getRoleCount("2Maschinist");
	}// }}}

	public getFacharbeiterCount(){// {{{
		return this.getRoleCount("3Facharbeiter");
	}// }}}

	public getHilfsarbeiterCount(){// {{{
		return this.getRoleCount("4Hilfsarbeiter");
	}// }}}

	public getNumWorkers(){// {{{
		return this.members.length;
	}// }}}

	//PRIVATE
	private clearTeam(){// {{{
		 this.members = [];
	}// }}}

	private getRoleCount(role){// {{{
		let count = 0;
		for (let member of this.members){
			if(member.role === role){count++;}
		}
		return count;
	}// }}}

}// }}}

class EquipmentItem {// {{{

	id: string;
	category: string;
	name: string;

	constructor(){
		this.setDefaultValues();
	}
	//PUBLIC 
	setData(data){ //{{{
		this.id = data.id;
		this.category= data.category;
		this.name= data.name;
	} // }}}
	getCategoryStr(){// {{{
		let categoryStr="";
		switch (this.category) {
			case "1Ramme": {
				//statements;
				categoryStr = "Ramme";
				break;
			}
			case "2Kran": {
				//statements;
				categoryStr = "Kran";
				break;
			}
			case "3Betonpumpe": {
				//statements;
				categoryStr = "Betonpumpe";
				break;
			}
			case "4Andere": {
				//statements;
				categoryStr = "Andere";
				break;
			}
			default: {
				categoryStr = this.category;
				break;
			}
		}
		return categoryStr;
	}// }}}



	//PRIVATE{{{
	private setDefaultValues(){// {{{
		this.id = "";
		this.name = "";
		this.category = "";
	}// }}}
// }}}
}// }}}

class EquipmentItemList {// {{{
	
	private items: any;

	//this is the list of items present on the construction site
	constructor(){
		this.items = [];
	}

	setData(itemData: any) {// {{{
		this.setItemsFromArray(itemData);
	}// }}}

	//PUBLIC
	public getItemFromId(id) : EquipmentItem {// {{{
		for (let item of this.items){
			if(item.id==id){return item;}
			else {continue;}
		}
		console.log("WARNING: No item with id: " + id + " found!");
// 		assert(1);
		return null;
	}// }}}
	public isEquipmentItemOnSite(id) : boolean {// {{{
		for (let item of this.items){
			if(item.id==id){return true;}
			else {continue;}
		}
		return false;
	}// }}}
	public addItem(data){// {{{
		let item = new EquipmentItem();
		item.setData(data);
		this.items.push(item);
	}// }}}
	public addItemsFromArray(itemData:any){// {{{
		 for (let item of itemData) {
			 this.addItem(item);
		 }
	}// }}}
	public setItemsFromArray(itemData:any) {// {{{
		this.clearList();
		this.addItemsFromArray(itemData);
	}// }}}
	public getItems(){// {{{
		return this.items;
	}// }}}
	public getRamCount(){// {{{
		return this.getCategoryCount("1Ramme");
	}// }}}
	public getCraneCount(){// {{{
		return this.getCategoryCount("2Kran");
	}// }}}
	public getPumpCount(){// {{{
		return this.getCategoryCount("3Betonpumpe");
	}// }}}
	public getOtherCount(){// {{{
		return this.getCategoryCount("4Andere");
	}// }}}
	
	//PRIVATE
	private clearList(){// {{{
		 this.items = [];
	}// }}}
	private getCategoryCount(category){// {{{
		let count = 0;
		for (let item of this.items){
			if(item.category === category){count++;}
		}
		return count;
	}// }}}

}// }}}

class Location {// {{{
	
	street: string;
	streetNr: string;
	zipcode: string;
	town: string;
	country: string;
	lat: string;
	lon: string;

	constructor(){// {{{
		this.street = "";
		this.streetNr = "";
		this.zipcode = "";
		this.town = "";
		this.country = "";
		this.lat = "";
		this.lon = "";
	}// }}}

	setData(data){// {{{
// 		this.street = data.street;
// 		this.streetNr = data.streetNr;
// 		this.zipcode = data.zipcode;
		this.town = data.town;
		this.country = data.country;
		this.lat = data.lat;
		this.lon = data.lon;
	}// }}}
}// }}}

class Contact {// {{{
	
	id: string;
	companyName: string;
	name: string;	
	surname: string;
	email: string;
	phoneNr: string;
	website: string;
	role: string;
	street: string;
	streetNr: string;
	zipcode: string;
	town: string;
	country: string;

	constructor(){// {{{
		this.id = "";
		this.companyName = "";
		this.name = "";	
		this.surname = "";
		this.email = "";
		this.phoneNr = "";
		this.website = "";
		this.role = "";
		this.street = "";
		this.streetNr = "";
		this.zipcode = "";
		this.town = "";
		this.country = "";
	}// }}}

	setData(data){// {{{
		this.id = data.id;
		this.companyName = data.companyName;
		this.name = data.contactName;	
		this.surname = data.contactSurname;
		this.email = data.email;
		this.phoneNr = data.phoneNr;
		this.website = data.website;
		this.role = data.role;
		this.street = data.addressStreet;
		this.streetNr = data.addressNr;
		this.zipcode = data.addressZipcode;
		this.town = data.addressTown;
		this.country = data.addressCountry;
	}// }}}
	setDefaultValues(){// {{{
		this.id = "";
		this.companyName = "";
		this.name = "";	
		this.surname = "";
		this.email = "";
		this.phoneNr = "";
		this.website = "";
		this.role = "";
		this.street = "";
		this.streetNr = "";
		this.zipcode = "";
		this.town = "";
		this.country = "";
	}// }}}
	getRoleStr(){
		let roleStr="";
		switch (this.role) {
			case "hotel": {
				//statements;
				roleStr = "Hotel";
				break;
			}
			case "subcontractor": {
				//statements;
				roleStr = "Nachunternehmer";
				break;
			}
			case "cs_manager": {
				//statements;
				roleStr = "Bauleiter";
				break;
			}
			default: {
				roleStr = this.role;
				break;
			}
		}
		return roleStr;
	}
}// }}}

class ContactList {// {{{

	items: any;

	constructor(){
		this.items = [];
	}

	setData(data){
		for (let item of data){
			let contact = new Contact();
			contact.setData(item);
			this.items.push(contact);
		}
	}

}// }}}

class Constructionsite {// {{{

	id: string;
	teamworkerData: any;
	workerTeam: WorkerTeam;
	equipmentItemList: EquipmentItemList;
	location: Location;
	contactList: ContactList;
	description: string;

	constructor(){// {{{
		this.id = "-1";
		this.description = ""; 
		this.workerTeam = new WorkerTeam();
		this.equipmentItemList = new EquipmentItemList();
		this.location = new Location();
		this.contactList = new ContactList();
	}// }}}
	
	setId(id){// {{{
		this.id=id;
	}// }}}
}// }}}

class DailyReport {// {{{

	id: string;
	constructionsite: any;
	timestamp: any;
	weatherReport: any;
	timeReport: any;
	workDoneArr:any = [];
	eventArr:any = [];

	constructor(){// {{{
		this.setDefaults();
	}// }}}

	setDefaults(){
		this.id = "-1";
		this.constructionsite = {id: "", description: ""};
		this.timestamp = {calendarWeek: "", weekDay: "", date: ""};
		this.weatherReport = {time: "", temperatureDegC: "", conditions: ""};
		this.timeReport = {countPolier: -1, countPolierHours: -1, 
			countMaschinist: -1, countMaschinistHours: -1, 
			countFacharbeiter: -1, countFacharbeiterHours: -1,
			countHilfsarbeiter: -1, countHilfsarbeiterHours: -1,
		};

		this.workDoneArr = [];
		this.eventArr = [];
	}
	
	setId(id){// {{{
		this.id=id;
	}// }}}
}// }}}


@Injectable()
export class ConstructionsiteProvider {

	private constructionsite: Constructionsite;
	private dailyReport: DailyReport;

	constructor(public http: HttpClient, public weather: WeatherProvider, private auth: AuthServiceProvider, public globals: GlobalsProvider, public time: TimeProvider) {// {{{
		console.log('Hello ConstructionsiteProvider Provider');
	}// }}}

	getConstructionsite(){// {{{
		return this.constructionsite;
	}// }}}

	public initialize(id){// {{{
		this.constructionsite= new Constructionsite();
		this.updateConstructionsite(id);
	}// }}}

	private updateConstructionsite(id){// {{{
		this.constructionsite.setId(id);
		this.loadConstructionsiteData();
		this.loadWeatherData();
		console.log("CONSITE FILLED:");
		console.log(this.constructionsite)
	}// }}}

	loadConstructionsiteData(){// {{{
		let url = this.globals.serverPhpScriptsUrl + "get_consite_info.php?token=" + this.auth.getUserInfo().getToken();
		this.http.get(url)
			.subscribe(data => {
				console.log("CONSITE INFO DATA:", data);
				this.setMeta(data['meta']);
				this.setLocation(data['location']);
				this.setWorkerTeam(data['personal_arr']);
				this.setEquipmentItemList(data['equipment_arr']);
				this.setContactList(data['contacts_arr']);
			});
	}// }}}
	private setMeta(data){// {{{
		this.constructionsite.description = data.description;
	}// }}}
	private setLocation(data){// {{{
		this.constructionsite.location.setData(data);
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
		this.weather.loadWeatherData(this.constructionsite.location.lat, this.constructionsite.location.lon);
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

	public generateDailyReport(){
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
	}
}
