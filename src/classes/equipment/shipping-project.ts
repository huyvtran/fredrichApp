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

	setDefaultValues(){
		this.id = "-1";
		this.timestamp = new Date();
		this.title = "";
		this.origin = "";
		this.destination = "";
		this.author = "";
		this.itemList = new EquipmentItemList();
	}

}
