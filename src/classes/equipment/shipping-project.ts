import { EquipmentItem } from './equipment-item';
import { EquipmentItemList } from './equipment-item-list';

export class ShippingProject {

	id: string;
	creationTime: Date;
	lastEditTime: Date;
	title: string;
	origin: string;
	destination: string;
	author: string;
	itemList: EquipmentItemList;

	constructor(){
		this.setDefaultValues();
	}

	setDefaultValues(){// {{{
		this.id = "-1";
		this.creationTime = new Date();
		this.lastEditTime = new Date();
		this.title = "";
		this.origin = "";
		this.destination = "";
		this.author = "";
		this.itemList = new EquipmentItemList();
	}// }}}
	setValues(data){// {{{
		console.log("SETTING VALUES FOR:");
		console.log(data);
		this.id = data.id;
		this.creationTime.setTime(data.time_created*1000);
		this.lastEditTime.setTime(data.time_last_edit*1000);
		this.title = data.title;
		this.origin = data.origin;
		this.destination = data.destination;
		this.author = data.author;
	}// }}}

	containsItem(item: EquipmentItem){// {{{
		return this.itemList.containsItem(item);
	}// }}}
	getId(){
		return this.id;
	}
	getProjectItems(){// {{{
		return this.itemList.getItems();
	}// }}}
	getNumProjectItems(){// {{{
		return this.itemList.getNumItems();
	}// }}}
	getOriginName(){// {{{
		return this.origin;
	}// }}}
	getDestinationName(){// {{{
		return this.destination;
	}// }}}
	setItemList(itemList: EquipmentItemList){// {{{
		this.itemList = itemList;
	}// }}}
	setOrigin(origin){
		this.origin=origin;
	}
	setDestination(destination){
		this.destination=destination;
	}


	addShippingItem(item: EquipmentItem){// {{{
		this.itemList.addItem(item);
	}// }}}
	addMultipleShippingItems(itemList: EquipmentItemList){// {{{
		//TODO: return ids of items that were already in the list
		for(let item of this.itemList.getItems()){
			this.itemList.addItem(item);
		}
	}// }}}

}
