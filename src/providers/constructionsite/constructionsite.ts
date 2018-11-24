import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { GlobalsProvider } from '../globals/globals'
import { WeatherProvider } from '../weather/weather'

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

	constructor(data){
		this.setValues(data);	
	}

	//PUBLIC

	//PRIVATE
	private setValues(data){// {{{
		this.id = data.id;
		this.name = data.name;
		this.surname = data.surname;
		this.phoneNr = data.phoneNr;
		this.email = data.email;
		this.role = data.role;
	}// }}}

	private setDefaultValues() {// {{{
		this.id = "--";
		this.name = "--";
		this.surname = "--";
		this.phoneNr = "--";
		this.email = "--";
		this.role= "";
	}// }}}
}// }}}

class WorkerTeam {// {{{
	
	private members: any;
	private constructionsiteId: string;
	//this is the team of workers working on the construction site
    constructor(teamData: any, id: string) {
		this.setMembersFromArray(teamData);
		this.constructionsiteId = id;
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
		 let worker = new Worker(data);
		 this.members.push(worker);
	}// }}}

	public addMembersFromArray(teamData:any){// {{{
		 for (let member of teamData) {
			 this.addMember(member);
		 }
	}// }}}

	public setMembersFromArray(teamData:any) {// {{{
		this.clearTeam();
		this.addMembersFromArray(teamData);
	}// }}}

	public getConstructionsiteId(){// {{{
		return this.constructionsiteId;
	}// }}}

	public getPolierCount(){// {{{
		return this.getRoleCount("polier");
	}// }}}

	public getMaschinistCount(){// {{{
		return this.getRoleCount("maschinist");
	}// }}}

	public getFacharbeiterCount(){// {{{
		return this.getRoleCount("facharbeiter");
	}// }}}

	public getHilfsarbeiterCount(){// {{{
		return this.getRoleCount("hilfsarbeiter");
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
	status: string;

	constructor(data){
		this.setValues(data);
	}
	//PUBLIC {{{
	public getStatus(){// {{{
		return this.status;
	}// }}}
// }}}

	//PRIVATE{{{
	private setValues(data){// {{{
		this.id = data.id;
		this.name = data.name;
		this.category = data.category;
		this.status= data.status;
	}// }}}
// }}}
}// }}}

class EquipmentItemList {// {{{
	
	private items: any;
	private constructionsiteId: string;

	//this is the list of items present on the construction site
	constructor(itemData: any, constructionsiteId: string) {
		this.setItemsFromArray(itemData);
		this.constructionsiteId = constructionsiteId;
	}

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
		 let item = new EquipmentItem(data);
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

	public getConstructionsiteId(){// {{{
		return this.constructionsiteId;
	}// }}}

	public getRamCount(){// {{{
		return this.getCategoryCount("ram");
	}// }}}

	public getCraneCount(){// {{{
		return this.getCategoryCount("crane");
	}// }}}

	public getPumpCount(){// {{{
		return this.getCategoryCount("pump");
	}// }}}

	public getOtherCount(){// {{{
		return this.getCategoryCount("other");
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
	lat: number;
	lon: number;

	constructor(data){
		this.street = data.street;
		this.streetNr = data.streetNr;
		this.zipcode = data.zipcode;
		this.town = data.town;
		this.country = data.country;
		this.lat = data.lat;
		this.lon = data.lon;
	}
}// }}}

class Constructionsite {// {{{

	id: string;
	teamworkerData: any;
	workerTeam: WorkerTeam;
	equipmentItemList: EquipmentItemList;
	location: Location;

	constructor(id: string){
		this.id = id;
		this.workerTeam = null;
		this.equipmentItemList = null;
		this.location = null;
	}
	
	refresh(){
		this.loadConstructionsiteData();
	}

	loadConstructionsiteData(){// {{{
		this.loadWorkerTeamData();
		this.loadEquipmentItemListData();
		this.loadLocationData();
	}// }}}
	loadWorkerTeamData(){// {{{
		let teamworkerData = [{id: "0", name: "Mueller", surname: "Franz", phoneNr: "0157999", email: "schreib@mirnemail.com", role: "polier"},
			{id: "1", name: "Beckenbauer", surname: "Franz", phoneNr: "0157999", email: "schreib@mirnemail.com", role: "maschinist"},
			{id: "2", name: "Ferdinand", surname: "Franz", phoneNr: "0157999", email: "schreib@mirnemail.com", role: "facharbeiter"},
			{id: "4", name: "Muentefering", surname: "Franz", phoneNr: "0157999", email: "schreib@mirnemail.com", role: "facharbeiter"},
			{id: "7", name: "Kaiser", surname: "Franz", phoneNr: "0157999", email: "schreib@mirnemail.com", role: "hilfsarbeiter"},
		];
		this.workerTeam = new WorkerTeam(teamworkerData, this.id);
		console.log(this.workerTeam);
	}// }}}
	loadEquipmentItemListData(){// {{{
		let equipmentData = [{id: '1', name: "CX 900", category: "ram"}, 
			{id: '17', name: "CX 500", category: "crane"}, 
			{id: '20', name: "Betonpumpe 1", category: "pump"},
			{id: '26', name: "S 613", category: "other"}];
		this.equipmentItemList = new EquipmentItemList(equipmentData, this.id);
		console.log(this.equipmentItemList);
	}// }}}
	loadLocationData(){// {{{
		let locationData = {street: "strasse", streetNr: "23", zipcode: "26789", town: "Wismar", country: "DE", lat: "52.5162696", lon: "13.4062872"};
		this.location = new Location(locationData);
		console.log(this.location);
	}// }}}
	loadWeatherData(weather: WeatherProvider) {
		weather.loadWeatherData(this.location.lat, this.location.lon);
	}

}// }}}

@Injectable()
export class ConstructionsiteProvider {// {{{

	private constructionsite: Constructionsite;

	constructor(public http: HttpClient, public weather: WeatherProvider) {
		console.log('Hello ConstructionsiteProvider Provider');
	}

	public initialize(id){// {{{
		this.constructionsite= new Constructionsite(id);
		this.update(id);
	}// }}}
	private update(id){// {{{
		this.constructionsite.id = id;
		this.constructionsite.refresh();
		this.constructionsite.loadWeatherData(this.weather);
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


}// }}}
