
export class DailyReport {// {{{

	id: string;
	constructionsite: any;
	timestamp: any;
	weatherReport: any;
	timeReport: any;
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
		this.timeReport = {countPolier: -1, countPolierHours: -1, 
			countMaschinist: -1, countMaschinistHours: -1, 
			countFacharbeiter: -1, countFacharbeiterHours: -1,
			countHilfsarbeiter: -1, countHilfsarbeiterHours: -1,
		};

		this.workDoneArr = [];
		this.eventArr = [];
	}// }}}
	
	setId(id){// {{{
		this.id=id;
	}// }}}
}// }}}


