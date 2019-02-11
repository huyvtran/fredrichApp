import { EquipmentItem } from './equipment-item';
import { EquipmentItemList } from './equipment-item-list';

export class ShippingProject {

	id: string;
	timestamp: Date;
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
		this.timestamp = new Date();
		this.title = "";
		this.origin = "";
		this.destination = "";
		this.author = "";
		this.itemList = new EquipmentItemList();
	}// }}}
	setValues(data){// {{{
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
		return "originName";
	}// }}}
	getDestinationName(){// {{{
		return "destinationName";
	}// }}}
	setItemList(itemList: EquipmentItemList){// {{{
		this.itemList = itemList;
	}// }}}

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
