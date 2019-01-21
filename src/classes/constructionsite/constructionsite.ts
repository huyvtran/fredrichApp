
import { WorkerTeam } from './worker-team'
import { EquipmentItemList } from '../equipment/equipment-item-list'
import { ContactList } from './contact-list'

export class Constructionsite {

	id: string;
	teamworkerData: any;
	workerTeam: WorkerTeam;
	equipmentItemList: EquipmentItemList;
	contactList: ContactList;
	description: string;

	constructor(){// {{{
		this.id = "-1";
		this.description = ""; 
		this.workerTeam = new WorkerTeam();
		this.equipmentItemList = new EquipmentItemList();
		this.contactList = new ContactList();
	}// }}}

	setId(id){// {{{
		this.id=id;
	}// }}}
	getId(){
		return this.id;
	}
	
}



