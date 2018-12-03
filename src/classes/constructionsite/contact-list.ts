import { Contact } from './contact'

export class ContactList {

	items: any;

	constructor(){
		this.items = [];
	}

	setData(data){// {{{
		for (let item of data){
			let contact = new Contact();
			contact.setData(item);
			this.items.push(contact);
		}
	}// }}}

}
