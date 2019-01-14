import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TimeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TimeProvider {

	date: any;
  constructor(public http: HttpClient) {
    console.log('Hello TimeProvider Provider');
  }

	getCurrentCalendarWeek(){
		let now = new Date();
		let yearStart = new Date(now.getFullYear(), 0,1);
		let mSecondsPerDay = 24*60*60*1000; //86.400.000
		let daysPerWeek = 7;
		let weekNo = Math.ceil(((now.valueOf()-yearStart.valueOf())/mSecondsPerDay+1)/daysPerWeek);
		return weekNo;
	}
		
	getDateStr(){
		let date = new Date();
		let dateStrOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'};
      return date.toLocaleDateString("de-DE", dateStrOptions);
	}

	getDateStrForFilename(){
		let d = new Date();
		let dateStr = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate() + "_" + d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds();
		return dateStr;
	}

	timeStr2Num(timeStr:string): number{
		let bits=timeStr.split(":");
		let timeNum = Number(bits[0]) + Number(bits[1])/60;
		return timeNum;
	}


}
