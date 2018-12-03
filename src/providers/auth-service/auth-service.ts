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

	private id: string;
	private token: string;

	name: string;
	surname: string;
	role: string;
	constructionsiteIds: any;
	currentConstructionsiteId: any;

	constructor(token: string, data: any) {// {{{
		console.log("Creating new User");
		this.setUserData(token, data);
	}// }}}

	setUserData(token: string, data:any) {// {{{
		this.token = token;
		this.name = data['userName'];
		this.surname = data['userSurname'];
		this.role = data['userRole'];
		this.constructionsiteIds = data['conSiteIdArr'];
		this.currentConstructionsiteId = data['currentConSiteId'];
	}// }}}

	getToken(){// {{{
		return this.token;
	}// }}}

}

@Injectable()
export class AuthServiceProvider {
	currentUser: User;

	constructor(public httpClient: HttpClient, public globals: GlobalsProvider) {// {{{
		console.log('Hello AuthServiceProvider Provider');
		this.currentUser = null;
	}// }}}

	public login(credentials) {// {{{
		if (credentials.token === null) { //credentials.email === null || credentials.password === null) {
			return Observable.throw("Please insert credentials");
		} else {
			return Observable.create(observer => {
				// At this point make a request to your backend to make a real check!
				let access = this.hasTokenAccess(credentials.token, observer);
			});
		}
	}// }}}

	public getUserInfo() : User {// {{{
		return this.currentUser;
	}// }}}

	public logout() {// {{{
		return Observable.create(observer => {
			this.currentUser = null;
			observer.next(true);
			observer.complete();
		});
	}// }}}

	private hasTokenAccess(token, observer: any) {// {{{
		let url = this.globals.serverPhpScriptsUrl + "login.php?token=" + token;
		let access = false;
		if(0){
			this.httpClient.get(url)
				.subscribe(data => {
					console.log(data);
					if(data.hasOwnProperty("fail")){
						access = false;
					} else {
						access = true;
						this.currentUser = new User(token, data);
					}
					observer.next(access);
					observer.complete();
				});
		} else {
			access = true;
			let data = {token: "456abc", userName: "Plate", userSurname: "Heinz", userRole: "polier", currentConstructionsiteId: "3388"};

			this.currentUser = new User(token, data);
			observer.next(access);
			observer.complete();
		}
	}// }}}

}
