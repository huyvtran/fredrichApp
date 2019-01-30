export class DailyReport {

	id: string;
	constructionsite: any;
	timestamp: any;
	weatherReport: any;
	workersTimeReport: any;
	workersTimeReportTotals: any;
	workDoneArr:any = [];
	eventArr:any = [];

	constructor(){// {{{
		this.setDefaults();
	}// }}}

	setDefaults(){// {{{
		this.id = "-1";
		this.constructionsite = {id: "", description: ""};
		this.timestamp = {calendarWeek: "", weekDay: "", date: ""};
		this.weatherReport = {time: "", temperatureDegC: "", conditions: ""};
		this.workersTimeReport = {countPolier: -1, countPolierHours: -1, 
			countMaschinist: -1, countMaschinistHours: -1, 
			countFacharbeiter: -1, countFacharbeiterHours: -1,
			countHilfsarbeiter: -1, countHilfsarbeiterHours: -1,
			countAzubi: -1, countAzubiHours: -1,
		};
		this.workersTimeReportTotals = [];

		this.workDoneArr = [];
		this.eventArr = [];
	}// }}}
	
	setId(id){// {{{
		this.id=id;
	}// }}}

}


