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
	contactTypes: any;

	loadingStatus:any;
	loadingStatusObserver:any;

	constructor(public http: HttpClient, private auth: AuthServiceProvider, public globals: GlobalsProvider) {// {{{
		console.log('Hello ConstructionsiteContactsProvider Provider');
		this.loadingStatus = Observable.create(observer => {
			this.loadingStatusObserver = observer;
		});
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
				let contacts_raw = data["contacts_arr"];
				for (let item of contacts_raw){
					let contact = new Contact();
					contact.setData(item);
					this.contacts.push(contact);
				}
				this.sortContacts();
			},
			err => {this.loadingStatusObserver.next(false);},
			() => {
				this.loadingStatusObserver.next(true);
				this.loadingStatusObserver.complete();
			});
	}// }}}

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
