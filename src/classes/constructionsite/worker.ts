
export class Worker {// {{{

	id: string;
	name: string;
	surname: string;
	phoneNr: string;
	email: string;
	role: string;
	schedule: any;
	timeWorkStart: string;
	timeWorkEnd: string;

	constructor(){
		this.id = "";
		this.name = "";
		this.surname = "";
		this.phoneNr = "";
		this.email = "";
		this.role = "";
		this.schedule = {timeStart: "07:00", timeEnd: "16:00"};
	}

	//PUBLIC
	setData(data){// {{{
		this.id = data.id;
		this.name = data.name;
		this.surname = data.surname;
		this.phoneNr = data.phoneNr;
		this.email = data.email;
		this.role = data.role;
		// 		this.schedule = ...
	}// }}}
	getRoleStr(){// {{{
		let roleStr="";
		switch (this.role) {
			case "1Polier": {
				//statements;
				roleStr = "Polier";
				break;
			}
			case "2Maschinist": {
				//statements;
				roleStr = "Maschinist";
				break;
			}
			case "3Facharbeiter": {
				//statements;
				roleStr = "Facharbeiter";
				break;
			}
			case "4Hilfsarbeiter": {
				//statements;
				roleStr = "Hilfsarbeiter";
				break;
			}
			default: {
				roleStr = this.role;
				break;
			}
		}
		return roleStr;
	}// }}}

	//PRIVATE
}// }}}


