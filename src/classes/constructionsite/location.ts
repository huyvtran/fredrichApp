
export class Location {// {{{
	
	street: string;
	streetNr: string;
	zipcode: string;
	town: string;
	country: string;
	lat: string;
	lon: string;

	constructor(){// {{{
		this.street = "";
		this.streetNr = "";
		this.zipcode = "";
		this.town = "";
		this.country = "";
		this.lat = "";
		this.lon = "";
	}// }}}

	setData(data){// {{{
// 		this.street = data.street;
// 		this.streetNr = data.streetNr;
// 		this.zipcode = data.zipcode;
		this.town = data.town;
		this.country = data.country;
		this.lat = data.lat;
		this.lon = data.lon;
	}// }}}
}// }}}


