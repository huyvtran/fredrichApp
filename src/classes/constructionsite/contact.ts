export class Contact {
	
	id: string;
	companyName: string;
	name: string;	
	surname: string;
	email: string;
	phoneNr: string;
	website: string;
	role: string;
	street: string;
	streetNr: string;
	zipcode: string;
	town: string;
	country: string;

	constructor(){// {{{
		this.id = "";
		this.companyName = "";
		this.name = "";	
		this.surname = "";
		this.email = "";
		this.phoneNr = "";
		this.website = "";
		this.role = "";
		this.street = "";
		this.streetNr = "";
		this.zipcode = "";
		this.town = "";
		this.country = "";
	}// }}}

	setData(data){// {{{
		this.id = data.id;
		this.companyName = data.companyName;
		this.name = data.contactName;	
		this.surname = data.contactSurname;
		this.email = data.email;
		this.phoneNr = data.phoneNr;
		this.website = data.website;
		this.role = data.role;
		this.street = data.addressStreet;
		this.streetNr = data.addressNr;
		this.zipcode = data.addressZipcode;
		this.town = data.addressTown;
		this.country = data.addressCountry;
	}// }}}
	setDefaultValues(){// {{{
		this.id = "";
		this.companyName = "";
		this.name = "";	
		this.surname = "";
		this.email = "";
		this.phoneNr = "";
		this.website = "";
		this.role = "";
		this.street = "";
		this.streetNr = "";
		this.zipcode = "";
		this.town = "";
		this.country = "";
	}// }}}
	getRoleStr(){// {{{
		let roleStr="";
		switch (this.role) {
			case "hotel": {
				//statements;
				roleStr = "Hotel";
				break;
			}
			case "subcontractor": {
				//statements;
				roleStr = "Nachunternehmer";
				break;
			}
			case "cs_manager": {
				//statements;
				roleStr = "Bauleiter";
				break;
			}
			default: {
				roleStr = this.role;
				break;
			}
		}
		return roleStr;
	}// }}}
}


