import { DamageReport } from './damage-report'

export class EquipmentItem {

	private id: string;
	private category: string;
	private name: string;
	private damageReports: any;

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
		console.log("Adding ID to damage Report: " + this.id);
		report.parentItemId = this.id;
		this.damageReports.push(report);
	}// }}}
	deleteDamageReport(report_id){// {{{
		let report_found = false;
		for (let i=0; i<this.getNumDamageReports(); i++){
			if(this.damageReports[i].getId()==report_id){
				console.log("deleting damage report with id:" + report_id);
				console.log(this.damageReports[i]);
				report_found = true;
				this.damageReports.splice(i,1);
			}
		}
		return report_found;
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


