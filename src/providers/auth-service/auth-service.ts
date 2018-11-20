import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export class User {
	name: string;
	email: string;
	token: string;
	role: string;
	constructionsite: any;

	constructor(token: string) {
		console.log("Creating new User");
		this.setUserData(token);
	}

	setUserData(token: string) {
		this.token = token;
		//TODO: download user data for token here
		this.name = "Heinz Mueller";
		this.email = "schreib@me.com";
		this.role = "polier";
		this.constructionsite = {id: 1, name: "Baustelle 2", location: "Wismar, DE"};
	}
}

@Injectable()
export class AuthServiceProvider {
	currentUser: User;

	constructor(public httpClient: HttpClient) {
		console.log('Hello AuthServiceProvider Provider');
	}


	public login(credentials) {
		if (credentials.email === null || credentials.password === null) {
			return Observable.throw("Please insert credentials");
		} else {
			return Observable.create(observer => {
				// At this point make a request to your backend to make a real check!
// 				let access = (credentials.password === "pass" && credentials.email === "email");
				let access = (credentials.token=== "testToken");
				this.currentUser = new User('testToken');
				observer.next(access);
				observer.complete();
			});
		}
	}

// 	public register(credentials) {
// 		if (credentials.email === null || credentials.password === null) {
// 			return Observable.throw("Please insert credentials");
// 		} else {
// 			// At this point store the credentials to your backend!
// 			return Observable.create(observer => {
// 				observer.next(true);
// 				observer.complete();
// 			});
// 		}
// 	}

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

}
