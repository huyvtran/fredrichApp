import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';
import { ActionSheetController } from 'ionic-angular';

/*
  Generated class for the TelephoneProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TelephoneProvider {

	constructor(
		public http: HttpClient, 
		private callNumber: CallNumber,
		public actionSheetCtrl: ActionSheetController
	) {
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

   presentActionSheetPhone(params) {// {{{
		let calleeStr = params.calleeStr;
		let phoneNr = params.phoneNr;
      const actionSheet = this.actionSheetCtrl.create({
			title: calleeStr + ' anrufen',
			buttons: [
				{
					text: phoneNr + ' wählen',
					handler: () => {
						this.callNr(phoneNr);
						console.log('Call Number clicked');
					}
				},{
					text: 'Zurück',
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked');
					}
				}
			]
      });
      actionSheet.present();
   }// }}}


}
