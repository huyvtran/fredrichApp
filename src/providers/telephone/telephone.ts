import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';

/*
  Generated class for the TelephoneProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TelephoneProvider {

  constructor(public http: HttpClient, private callNumber: CallNumber) {
    console.log('Hello TelephoneProvider Provider');
  }

	callNr(phoneNrDirty){ // {{{
		let phoneNrSanitized = this.sanitizePhoneNr(phoneNrDirty);
      this.callNumber.callNumber(phoneNrSanitized, true)
        .then(res => console.log('Launched dialer!', res))
        .catch(err => console.log('Error launching dialer', err));
   }// }}}

	sanitizePhoneNr(phoneNr){
		return phoneNr; //XXX
	}

}
