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
// 		let now = new Date();
		return "42"; //XXX
	
	}
		
	getDateStr(){
		let date = new Date();
		let dateStrOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'};
      return date.toLocaleDateString("de-DE", dateStrOptions);
	}

	timeStr2Num(timeStr:string): number{
		let bits=timeStr.split(":");
		let timeNum = Number(bits[0]) + Number(bits[1])/60;
		return timeNum;
	}


}
