import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import { ShippingProject } from '../../classes/equipment/shipping-project';
import { EquipmentItem } from '../../classes/equipment/equipment-item'

import { ConstructionsiteEquipmentProvider } from '../../providers/constructionsite-equipment/constructionsite-equipment'
import { GlobalsProvider } from '../../providers/globals/globals';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/*
  Generated class for the ConstructionsiteShippingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConstructionsiteShippingProvider {

	incomingShippingProjects: any = null;
	outgoingShippingProjects: any = null;
	shippingLocations: any = null;

	private loadingChecklist:any;
	private loadingStatus:any;
	private loadingStatusObserver:any;

	constructor(public http: HttpClient,
		public equipment: ConstructionsiteEquipmentProvider,
		public globals: GlobalsProvider,
		public auth: AuthServiceProvider
	) {
    console.log('Hello ConstructionsiteShippingProvider Provider');
		this.loadingStatus = Observable.create(observer => {
			this.loadingStatusObserver = observer;
		});
  }
	initialize(){
		this.loadAllShippingProjects();
		this.loadShippingLocations();
	}
	hasLoadingCompleted(){// {{{
		if(this.loadingChecklist.incoming && this.loadingChecklist.outgoing){
			this.loadingStatusObserver.complete();
			console.log("LOADING HAS COMPLETED:");
			console.log("INCOMING PROJECTS:", this.incomingShippingProjects);
			console.log("OUTGOING PROJECTS:", this.outgoingShippingProjects);
			return true;
		} else {
			return false;
		}
	}// }}}
	loadingStatusUpdates(){// {{{
		return this.loadingStatus;
	}// }}}
	loadAllShippingProjects(){// {{{
		this.loadingChecklist = {incoming:null, outgoing:null};
		this.incomingShippingProjects = [];
		console.log("OBSERVER:", this.loadingStatusObserver);
		this.loadShippingProjectsByType('incoming')
			.then(projects => {
				this.incomingShippingProjects = projects;
				this.loadingChecklist.incoming = true;
				this.loadingStatusObserver.next(this.hasLoadingCompleted());
			})
			.catch(err => {
				console.log(JSON.stringify(err));
				this.loadingChecklist.incoming = false;
				this.loadingStatusObserver.next(this.hasLoadingCompleted());
			})

		this.outgoingShippingProjects = [];
		this.loadShippingProjectsByType('outgoing')
			.then(projects => {
// 				console.log(projects);
				this.outgoingShippingProjects = projects;
				this.loadingChecklist.outgoing= true;
				this.loadingStatusObserver.next(this.hasLoadingCompleted());
			})
			.catch(err => {
				console.log(JSON.stringify(err));
				this.loadingChecklist.outgoing= false;
				this.loadingStatusObserver.next(this.hasLoadingCompleted());
			})
	}// }}}
	loadShippingProjectsByType(_type:string){// {{{
		//build url{{{
		let url = this.globals.serverPhpScriptsUrl;
		switch(_type){ 
			case 'incoming': { 
				url = url + "get_incoming_shippingprojects.php";
				break; 
			} 
			case 'outgoing': { 
				url = url + "get_outgoing_shippingprojects.php";
				break; 
			} 
			default: { 
				throw new Error("unknown shipping project type: " + _type);
// 				break; 
			} 
		} 
		url = url + "?token=" + this.auth.getUserInfo().getToken();
		console.log(url);
// 		let url = this.globals.serverPhpScriptsUrl + "get_shippingprojects.php?token=" + this.auth.getUserInfo().getToken();
		// }}}
		let retval = [];
		const promise = new Promise((resolve, reject) => {
			this.http.get(url)
				.subscribe(data => {
// 					console.log(data);
					let project_data_arr=data["project_arr"];
					for (let pd of project_data_arr){
						let project = new ShippingProject();
						project.setValues(pd["meta"]);	
						for(let id of pd["equipment_ids"]){
							let item = this.equipment.getItemFromId(id);	
							if(item){
								project.addShippingItem(item);
							}
						}
						retval.push(project);
					}
// 					//TESTING
// 					console.log("LOADED " + _type + " PROJECTS");
// 					console.log(retval);

					resolve(retval);
				},
				err => {
					reject(err);
				});
		});
		return promise;
	}// }}}
	loadShippingLocations(){// {{{
		//TODO: load shippinglocations from server
		this.shippingLocations = [];
		for(let i=0; i<3;i++){
			let location = {id: String(3388 + i), name: "loc" + String(i)};
			this.shippingLocations.push(location);
		}
	}// }}}
	syncShippingProject(project: ShippingProject){// {{{
	//TODO: 2. Function to sync shipping projects with server
		//1. update, 2. merge (local changes preferred), 3. upload to server
	}// }}}
	isItemShippable(item: EquipmentItem){// {{{
		let isShippable = true;
		//go through all projects and check whether item is part of any. If yes -> not shippable.
		for (let project of this.getAllShippingProjects()){
			if(project.containsItem(item)){
				isShippable = false;
				break;
			}
		}
		return isShippable;
	}// }}}
	createNewShippingProject(){// {{{
		const promise = new Promise((resolve, reject) => {
			let project = new ShippingProject();
			this.requestNewShippingProject()
				.then(data => {
					project.setValues(data);	
					this.outgoingShippingProjects.push(project);
					resolve(project);
				})
				.catch(err => {
					console.log(JSON.stringify(err));
					reject(err);
				})
		});
		return promise;
	}// }}}
	requestNewShippingProject(){// {{{
		const promise = new Promise((resolve, reject) => {
			let url = this.globals.serverPhpScriptsUrl + "create_new_shippingproject.php?token=" + this.auth.getUserInfo().getToken();
// 			console.log(url);
			this.http.get(url)
				.subscribe(data => {
					console.log(data);
					resolve(data);
				},
				err => {
					reject(err);
				});
		});
		return promise;
	}// }}}

	//GETTERS
	getAllShippingProjects(){// {{{
		return this.incomingShippingProjects.concat(this.outgoingShippingProjects);
	}// }}}
	getNumAllShippingProjects(){// {{{
		return this.getNumOutgoingShippingProjects() + this.getNumIncomingShippingProjects();
	}// }}}
	getOutgoingShippingProjects(){// {{{
		return this.outgoingShippingProjects;
	}// }}}
	getNumOutgoingShippingProjects(){// {{{
		return this.outgoingShippingProjects.length;
	}// }}}
	getIncomingShippingProjects(){// {{{
		return this.incomingShippingProjects;
	}// }}}
	getNumIncomingShippingProjects(){// {{{
		return this.incomingShippingProjects.length;
	}// }}}
	getShippingLocations(){// {{{
		return this.shippingLocations;
	}// }}}
	getShippableItems(){// {{{
		return this.equipment.getEquipmentItemListArray()
	}// }}}
	getParentProjectIdForItem(item){// {{{
		for (let project of this.getAllShippingProjects()){
			if(project.containsItem(item)){
				return project.getId();
			}
		}
		return null;
	}// }}}
	
	//SETTERS

}
