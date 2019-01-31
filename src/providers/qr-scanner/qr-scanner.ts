import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
// import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
//
import { EquipmentItem } from '../../classes/equipment/equipment-item'

/*
  Generated class for the QrScannerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QrScannerProvider {

	constructor(
		public http: HttpClient,
		private barcodeScanner: BarcodeScanner,
		private alertCtrl: AlertController
	) {
    console.log('Hello QrScannerProvider Provider');
  }

	scan() {
		let options = {
			preferFrontCamera : false, // iOS and Android
			showFlipCameraButton : false, // iOS and Android
			showTorchButton : false, // iOS and Android
			torchOn: false, // Android, launch with the torch switched on (if available)
			saveHistory: true, // Android, save scan history (default false)
			prompt : "Place a barcode inside the scan area", // Android
			resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
			formats : "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
// 			orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
			disableAnimations : false, // iOS
			disableSuccessBeep: false // iOS and Android
		};

		const promise = new Promise((resolve, reject) => {
			this.barcodeScanner.scan(options).then(data => {
				// this is called when a barcode is found
				console.log(JSON.stringify(data));
				this.presentAlert(data["text"]);
				resolve(data["text"]);
// 				return data["text"];
			})
			.catch(err => {
				reject(err);
			});
		});
		return promise;
	}

	scanEquipment(){
		const promise = new Promise((resolve, reject) => {
			this.scan()
				.then(res => {
					let item = this.getEquipmentFromId(res);
					resolve(item);	
				})
				.catch(err => {
					console.log(JSON.stringify(err));
					reject(err);
				});
		});
		return promise;
	}

	getEquipmentFromId(id){
		//TODO: implement real search here
		let item = new EquipmentItem();
		item.setData({id: id, category: "4Andere", name: "Hydr.Agg IHC 27tm 313 KW Fundex IHC I"});
		return item;
	}

	presentAlert(text) {
		let alert = this.alertCtrl.create({
		 title: 'QR-Scan',
		 subTitle: 'Gescannter Text: ' + text,
		 buttons: ['OK']
	  });
	  alert.present();
  }

}
