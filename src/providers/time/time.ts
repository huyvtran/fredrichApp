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
		let dateStr = d.getFullYear() + "-" + 
			this.pad((d.getMonth()+1)) + "-" + 
			this.pad(d.getDate()) + "_" + 
			this.pad(d.getHours()) + "-" + 
			this.pad(d.getMinutes()) + "-" + 
			this.pad(d.getSeconds());
		return dateStr;
	}

	timeStr2Num(timeStr:string): number{
		let bits=timeStr.split(":");
		let timeNum = Number(bits[0]) + Number(bits[1])/60;
		return timeNum;
	}

	//TODO: move to utils
	pad(str:any, numZeros?:number){
		if(numZeros){/*do nothing*/}
		else {numZeros=2;}
		str = String(str);
		var padding = '';
		for (let i=0; i<numZeros;i++){padding = padding + '0';}
		let paddedStr = (padding + str).slice(-padding.length);
		return paddedStr;
	}



}
