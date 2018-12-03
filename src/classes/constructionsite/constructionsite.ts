
import { WorkerTeam } from './worker-team'
import { EquipmentItemList } from './equipment-item-list'
import { Location } from './location'
import { ContactList } from './contact-list'

export class Constructionsite {

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
}



