
export class Worker {// {{{

	id: string;
	name: string;
	surname: string;
	phoneNr: string;
	email: string;
	role: string;
	isPresent:boolean;
	timeWorkStart: string;
	timeWorkEnd: string;

	constructor(){
		this.id = "";
		this.name = "";
		this.surname = "";
		this.phoneNr = "";
		this.email = "";
		this.role = "";
		this.isPresent = true;
		this.timeWorkStart = "07:00"; //TODO: RICHTIG SETZEN
		this.timeWorkEnd= "16:30";
	}

	//PUBLIC
	setData(data){// {{{
		this.id = data.id;
		this.name = data.name;
		this.surname = data.surname;
		this.phoneNr = data.phoneNr;
		this.email = data.email;
		this.role = data.role;
		this.isPresent = data.isPresent;
		this.timeWorkStart = data.timeWorkStart;
		this.timeWorkEnd = data.timeWorkEnd;
	}// }}}
	getRole(){// {{{
		return this.role;
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
			case "5Azubi": {
				//statements;
				roleStr = "Azubi";
				break;
			}
			default: {
				roleStr = this.role;
				break;
			}
		}
		return roleStr;
	}// }}}
	getHoursWorkedToday(){
		console.log("time work start:", this.timeWorkStart);
		let hourStart = this.timeStr2Num(this.timeWorkStart);
		let hourEnd = this.timeStr2Num(this.timeWorkEnd);
		return hourEnd - hourStart;
	}

	timeStr2Num(timeStr:string): number{
		let bits=timeStr.split(":");
		let timeNum = Number(bits[0]) + Number(bits[1])/60;
		return timeNum;
	}

	//PRIVATE
}// }}}


