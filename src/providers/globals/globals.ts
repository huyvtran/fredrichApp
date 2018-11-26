import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalsProvider {

	serverUrl: string;
	serverPhpScriptsUrl: string;

  constructor(public http: HttpClient) {
    console.log('Hello GlobalsProvider Provider');
	  this.setGlobalVars();
  }

	setGlobalVars(){
		this.serverUrl = "http://www.opendimensions.de/fredrich_projekte/";
		this.serverPhpScriptsUrl = this.serverUrl + "app/johannes/";
	}

}
