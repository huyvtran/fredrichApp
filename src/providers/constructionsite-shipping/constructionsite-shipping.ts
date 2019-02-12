import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

	shippingProjects: any = [];
	shippingLocations: any =[];

	constructor(public http: HttpClient,
		public equipment: ConstructionsiteEquipmentProvider,
		public globals: GlobalsProvider,
		public auth: AuthServiceProvider
	) {
    console.log('Hello ConstructionsiteShippingProvider Provider');
	  //TESTING
	  this.loadShippingProjects();
	  this.loadShippingLocations();
  }
	loadShippingProjects(){// {{{
		//TODO: 1. load shippingprojects from server
		this.shippingProjects = [];
		let url = this.globals.serverPhpScriptsUrl + "get_shippingprojects.php?token=" + this.auth.getUserInfo().getToken();
		this.http.get(url)
			.subscribe(data => {
				console.log(data);
				let project_data_arr=data["project_arr"];
				for (let pd of project_data_arr){
					let project = new ShippingProject();
					project.setValues(pd["meta"]);	
					for(let id of pd["equipment_ids"]){
						let item = this.equipment.getItemFromId(id);	
						project.addShippingItem(item);
					}
					this.shippingProjects.push(project);
				}
				console.log(this.shippingProjects);
			},
			err => {
				console.log(JSON.stringify(err));
			});
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
		for (let project of this.shippingProjects){
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
					this.shippingProjects.push(project);
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
	getShippingProjects(){// {{{
		return this.shippingProjects;
	}// }}}
	getNumShippingProjects(){// {{{
		return this.shippingProjects.length;
	}// }}}
	getShippingLocations(){// {{{
		return this.shippingLocations;
	}// }}}
	getShippableItems(){// {{{
		return this.equipment.getEquipmentItemListArray()
	}// }}}
	getParentProjectIdForItem(item){
		for (let project of this.shippingProjects){
			if(project.containsItem(item)){
				return project.getId();
			}
		}
		return null;
	}
	
	//SETTERS

}
