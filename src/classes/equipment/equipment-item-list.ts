import { EquipmentItem } from './equipment-item'

export class EquipmentItemList {
	
	private items: any;

	//this is the list of items present on the construction site
	constructor(){
		this.items = [];
	}

	setData(itemData: any) {// {{{
		this.setItemsFromArray(itemData);
	}// }}}

	//PUBLIC
	public containsItem(itemIn: EquipmentItem){// {{{
		for(let item of this.items){
			if(item.getId() === itemIn.getId()){
				return true;
			}
		}
		return false;
	}// }}}
	public getItemFromId(id) : EquipmentItem {// {{{
		for (let item of this.items){
			if(item.id==id){return item;}
			else {continue;}
		}
		return null;
// 		throw new Error("No item with id: " + id + " found!")
// 		console.log("WARNING: No item with id: " + id + " found!");
// 		assert(1);
	}// }}}
	public isEquipmentItemOnSite(id) : boolean {// {{{
		for (let item of this.items){
			if(item.id==id){return true;}
			else {continue;}
		}
		return false;
	}// }}}
	public addItem(data){// {{{ //TODO: refactor so that this accepts only items, and another routine which accepts the data
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
	public getNumItems(){// {{{
		return this.items.length;
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

	//XXX
	addDummyDamageReports(){
		for (let item of this.items){
			item.addDummyDamageReport();
		}
		console.log("DUMMY DAMAGE REPORTS ADDED");
	}

}


