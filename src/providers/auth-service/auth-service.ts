import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GlobalsProvider } from '../globals/globals'

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

// the login interface follows an ionic 2 login example
// https://devdactic.com/login-ionic-2/

export class User {

	id: string;
	name: string;
	email: string;
	token: string;
	role: string;
	constructionsiteIds: any;
	currentConstructionsiteId: any;

	constructor(token: string) {
		console.log("Creating new User");
		this.setUserData(token);
	}

	setUserData(token: string) {

		this.token = token;
		//TODO: download user data for token here
		this.getUserData();
			
// 			[{id: 0, name: "Baustelle Bremerhaven", location: "Bremerhaven, DE"}, 
// 			{id: 1, name: "Baustelle Wismar", location: "Wismar, DE"}];
	}

	getUserData(){
		this.name = "Heinz Mueller";
		this.email = "schreib@me.com";
		this.role = "polier";
		this.constructionsiteIds = [3380, 3388, 3392];
		this.currentConstructionsiteId = this.constructionsiteIds[1];
	}
}

@Injectable()
export class AuthServiceProvider {
	currentUser: User;

	constructor(public httpClient: HttpClient, public globals: GlobalsProvider) {
		console.log('Hello AuthServiceProvider Provider');
		this.currentUser = null;
	}

	public login(credentials) {
		if (credentials.token === null) { //credentials.email === null || credentials.password === null) {
			return Observable.throw("Please insert credentials");
		} else {
			return Observable.create(observer => {
				// At this point make a request to your backend to make a real check!
				let access = this.hasTokenAccess(credentials.token, observer);
			});
		}
	}

	public getUserInfo() : User {
		return this.currentUser;
	}

	public logout() {
		return Observable.create(observer => {
			this.currentUser = null;
			observer.next(true);
			observer.complete();
		});
	}

	private hasTokenAccess(token, observer: any) {
		let url = this.globals.serverPhpScriptsUrl + "login.php?token=" + token;
		let access = false;
		this.httpClient.get(url)
			.subscribe(data => {
				console.log(data);
				if(data[0].hasOwnProperty("fail")){
					access = false;
				} else {
					access = true;
					this.currentUser = new User(token);
				}
				observer.next(access);
				observer.complete();
			});
	}

}
