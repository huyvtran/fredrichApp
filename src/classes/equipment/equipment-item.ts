import { DamageReport } from './damage-report'

export class EquipmentItem {

	private id: string;
	private category: string;
	private name: string;
	private damageReports: any;

	constructor(){
		this.setDefaultValues();
		this.addDummyDamageReport();
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
	getId(){// {{{
		return this.id;
	}// }}}
	getName(){// {{{
		return this.name;
	}// }}}
	getCategory(){// {{{
		return this.category;
	}// }}}
	getDamageReports(){// {{{
		return this.damageReports;
	}// }}}
	getNumDamageReports(){// {{{
		return this.damageReports.length;
	}// }}}

	addDamageReport(report: DamageReport){// {{{
		report.parentItemId = this.id;
		this.damageReports.push(report);
	}// }}}
	deleteDamageReport(report_id){// {{{
		for (let i=0; i<this.getNumDamageReports(); i++){
			if(this.damageReports[i].getId()==report_id){
				this.damageReports.splice(i,1);
			}
		}
	}// }}}

	//PRIVATE
	private setDefaultValues(){// {{{
		this.id = "";
		this.name = "";
		this.category = "";
		this.damageReports = [];
	}// }}}

	//TESTING ONLY
	private addDummyDamageReport(){// {{{ 
		let report = new DamageReport();
		report.id = "108";
		report.author = "Autorname";
		report.title = "Report Title";
		this.addDamageReport(report);
	}// }}}
}


