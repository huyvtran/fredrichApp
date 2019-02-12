import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Observable';

import { AuthServiceProvider } from '../auth-service/auth-service';
import { GlobalsProvider } from '../globals/globals'

import { EquipmentItemList } from '../../classes/equipment/equipment-item-list'
import { DamageReport } from '../../classes/equipment/damage-report'

/*
  Generated class for the ConstructionsiteEquipmentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConstructionsiteEquipmentProvider {

	consiteId: string;
	equipmentItemList: EquipmentItemList;

	loadingStatus:any;
	loadingStatusObserver:any;

  constructor(public http: HttpClient, private auth: AuthServiceProvider, public globals: GlobalsProvider) {
    console.log('Hello ConstructionsiteEquipmentProvider Provider');
	  this.initialize();

  }

	// initialization and population
	initialize(){// {{{
		this.consiteId = "-1";
		this.equipmentItemList = new EquipmentItemList();
		this.loadingStatus = Observable.create(observer => {
			this.loadingStatusObserver = observer;
		});
	}// }}}
	loadEquipmentData() {// {{{
		let url = this.globals.serverPhpScriptsUrl + "get_consite_equipment.php?token=" + this.auth.getUserInfo().getToken();
		this.http.get(url)
			.subscribe(data => {
				let equipment_raw = data["equipment_arr"];
				for (let data_item of equipment_raw){
// 					let item = new EquipmentItem();
// 					item.setData(data_item);
					this.equipmentItemList.addItem(data_item);
				}
				this.equipmentItemList.addDummyDamageReports(); //XXX
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

	//GETTERS
	public getItemFromId(item_id){
		return this.equipmentItemList.getItemFromId(item_id);
	}
	public getRamCount(){// {{{
		return this.equipmentItemList.getRamCount();
	}// }}}
	public getCraneCount(){// {{{
		return this.equipmentItemList.getCraneCount();
	}// }}}
	public getPumpCount(){// {{{
		return this.equipmentItemList.getPumpCount();
	}// }}}
	public getOtherCount(){// {{{
		return this.equipmentItemList.getOtherCount();
	}// }}}
	public getEquipmentItemListArray(){// {{{
		return this.equipmentItemList.getItems();
	}// }}}
	public getEquipmentItemList(){// {{{
		return this.equipmentItemList;
	}// }}}
	public getNumDamageReports(){// {{{
		let numDamageReports = 0;
		let items = this.equipmentItemList.getItems();
		for(let item of items){
			numDamageReports += item.getNumDamageReports();
		}
		return numDamageReports;
	}// }}}
	public getDamageReportParentItem(report: DamageReport){// {{{
		let item_id = report.getParentItemId();
		console.log("item id: " + item_id);
		return this.equipmentItemList.getItemFromId(item_id);
	}// }}}

	//SETTERS
	setEquipmentItemListData(data){// {{{
		this.equipmentItemList.setData(data);
	}// }}}

}
