import { DamageReport } from './damage-report'

export class EquipmentItem {

	id: string;
	category: string;
	name: string;
	damageReports: any;

	constructor(){
		this.setDefaultValues();
	}
	//PUBLIC 
	setData(data){ //{{{
		this.id = data.id;
		this.category= data.category;
		this.name= data.name;
	} // }}}
	getCategoryStr(){// {{{
		let categoryStr="";
		switch (this.category) {
			case "1Ramme": {
				//statements;
				categoryStr = "Ramme";
				break;
			}
			case "2Kran": {
				//statements;
				categoryStr = "Kran";
				break;
			}
			case "3Betonpumpe": {
				//statements;
				categoryStr = "Betonpumpe";
				break;
			}
			case "4Andere": {
				//statements;
				categoryStr = "Andere";
				break;
			}
			default: {
				categoryStr = this.category;
				break;
			}
		}
		return categoryStr;
	}// }}}
	getId(){
		return this.id;
	}
	getDamageReports(){
		return this.damageReports;
	}
	getName(){
		return this.name;
	}

	addDamageReport(report: DamageReport){
		this.damageReports.push(report);
	}

	//PRIVATE
	private setDefaultValues(){// {{{
		this.id = "";
		this.name = "";
		this.category = "";
		this.damageReports = [];
	}// }}}
}


