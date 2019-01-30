import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Observable';

import { AuthServiceProvider } from '../auth-service/auth-service';
import { GlobalsProvider } from '../globals/globals'

import { Contact } from '../../classes/constructionsite/contact'

/*
  Generated class for the ConstructionsiteContactsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConstructionsiteContactsProvider {

	contacts:any;
	contactCategories: any;
	contactTypes: any;
	categoryRoles: any;

	loadingStatus:any;
	loadingStatusObserver:any;

	constructor(public http: HttpClient, private auth: AuthServiceProvider, public globals: GlobalsProvider) {// {{{
		console.log('Hello ConstructionsiteContactsProvider Provider');
		this.loadingStatus = Observable.create(observer => {
			this.loadingStatusObserver = observer;
		});
		this.contactCategories = [];
		this.contactTypes = [
			"Bauleitung",
			"Bauherr",
			"Projektleitung",
			"Architekt",
			"Vermesser",
			"Hotel",
			"Kapper",
			"Dixi",
			"Erdbauer",
			"Zaiko/Steiner",
			"StatikerBauherr",
			"Bodengutachter",
			"Pruefing",
			"LieferantDiesel",
			"LieferantGasSauerstoff",
			"LieferantBeton",
			"LieferantBewehrungsstahl",
			"LieferantFußplatten"];

	}// }}}

	loadContactsData() {// {{{
		this.contacts = [];
		let url = this.globals.serverPhpScriptsUrl + "get_consite_contacts.php?token=" + this.auth.getUserInfo().getToken();
		this.http.get(url)
			.subscribe(data => {
// 				console.log("CONTACTS DATA:")
// 				console.log(data);
				let contactsRaw = data["contacts_arr"];
				for (let item of contactsRaw){
					let contact = new Contact();
					contact.setData(item);
					this.contacts.push(contact);
				}
				this.sortContacts();

				this.categoryRoles = data["category_role_arr"];
				for (let cat of this.categoryRoles){
// 					cat.open = false;
				}
			},
			err => {this.loadingStatusObserver.next(false);},
			() => {
				this.loadingStatusObserver.next(true);
				this.loadingStatusObserver.complete();
			});
	}// }}}

	getContactsForCategory(index){
		console.log("getting contacts for category: " + index + ": " + this.categoryRoles[index].name);
		let roles = this.categoryRoles[index].roles;
		let retval = [];
		for (let contact of this.contacts) {
			if(roles.indexOf(contact.getRole())>=0){
				retval.push(contact);
			}
		}
		return retval;
	}

	loadingUpdates(){// {{{
		return this.loadingStatus;
	}// }}}

	sortContacts(){// {{{
		this.contacts.sort((a, b) => {
			let roleIdA = this.contactTypes.indexOf(a.role);
			let roleIdB = this.contactTypes.indexOf(b.role);
			return roleIdA - roleIdB;
		});
	}// }}}

	getContacts(){// {{{
		return this.contacts;
	}// }}}

	getContactTypes(){// {{{
		return this.contactTypes;
	}// }}}
}
