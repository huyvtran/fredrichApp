import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShippingProject } from '../../classes/equipment/shipping-project';

import { EquipmentItem } from '../../classes/equipment/equipment-item'
import { ConstructionsiteEquipmentProvider } from '../../providers/constructionsite-equipment/constructionsite-equipment'

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
		public equipment: ConstructionsiteEquipmentProvider
	) {
    console.log('Hello ConstructionsiteShippingProvider Provider');
	  //TESTING
	  this.loadShippingProjects();
	  this.loadShippingLocations();
  }
	loadShippingProjects(){// {{{
		//TODO: 1. load shippingprojects from server
		this.shippingProjects = [];
		for(let i=0; i<3;i++){
			let project = new ShippingProject();
			let data = {
				title: "title"+String(i), 
				origin:"origin"+String(i), 
				destination:"destination"+String(i), 
				author:"author"+String(i)
			};
			project.setValues(data);
			this.shippingProjects.push(project);
		}
	}// }}}
	loadShippingLocations(){// {{{
		//TODO: 1. load shippinglocations from server
		this.shippingLocations = [];
		for(let i=0; i<3;i++){
			let location = {id: String(3380 + i), name: "loc" + String(i)};
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
	createNewShippingProject(){
		let project = new ShippingProject();
		this.shippingProjects.push(project);
		return project;
	}

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
	
	//SETTERS

}
