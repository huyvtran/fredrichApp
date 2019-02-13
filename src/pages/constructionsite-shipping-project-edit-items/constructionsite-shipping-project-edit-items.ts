import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { EquipmentItem } from '../../classes/equipment/equipment-item'
import { EquipmentItemList } from '../../classes/equipment/equipment-item-list'
import { ShippingProject } from '../../classes/equipment/shipping-project';
import { ConstructionsiteShippingProvider } from '../../providers/constructionsite-shipping/constructionsite-shipping'

/**
 * Generated class for the ConstructionsiteShippingProjectEditItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-constructionsite-shipping-project-edit-items',
  templateUrl: 'constructionsite-shipping-project-edit-items.html',
})
export class ConstructionsiteShippingProjectEditItemsPage {

	project: ShippingProject;
	shippableItems: any;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		private alertCtrl: AlertController,
		public shipping: ConstructionsiteShippingProvider
	) {
		this.project = this.navParams.get('project');
	}

	ionViewDidLoad() {// {{{
		console.log('ionViewDidLoad ConstructionsiteShippingProjectEditItemsPage');
		this.prepareShippableItems();
	}// }}}
	ionViewWillLeave() {// {{{
		this.setSelectedItems();
	}// }}}
	toggleItem(entry){// {{{
// 		console.log("toggling entry to: ", !entry.isSelected);
		if(this.isPartOfOtherShippingProject(entry)){
			console.log(entry.item.getName() + " is part of other shipping project, doing nothing");
			//do nothing
		} else {
			entry.isSelected = !entry.isSelected;
		}
	}// }}}
	prepareShippableItems(){// {{{
		this.shippableItems = [];
		let itemList = this.shipping.getShippableItems();
		for (let item of itemList){
			let entry = {isSelected:this.project.containsItem(item), item:item}
			this.shippableItems.push(entry);
		}
		console.log("prepared shippable items:");
		console.log(this.shippableItems);
	}// }}}
	okButtonClicked(){// {{{
		//leaving view will set selected items
// 		this.setSelectedItems();
		this.navCtrl.pop();
	}// }}}
	setSelectedItems(){// {{{
		let selectedItems = this.getSelectedItems();
		this.project.setItemList(selectedItems);

		console.log("selected items:");
		console.log(selectedItems);
	}// }}}
	getSelectedItems(){// {{{
		let itemList = new EquipmentItemList();
		for (let entry of this.shippableItems){
			if(entry.isSelected){
				itemList.addItem(entry.item);
			}
		}
		return itemList;
	}// }}}
	isPartOfOtherShippingProject(entry){// {{{
		let parentId = this.shipping.getParentProjectIdForItem(entry.item);
		let isPart = false;
		if(parentId && parentId != this.project.getId()){
			isPart = true;
// 			return true;
		} else {
			isPart = false;
// 			return false;
		}
		return isPart;
	}// }}}
	presentPromptUserInputItemNumber(){// {{{
		let alert = this.alertCtrl.create({
			title: 'Gerät hinzufügen',
			inputs: [
				{
					name: 'itemNumber',
					placeholder: 'Gerätenummer',
					type: 'text'
				}
			],
			buttons: [
				{
					text: 'Abbrechen',
					role: 'cancel',
					handler: data => {
						console.log('Cancel clicked');
					}
				},
				{
					text: 'OK',
					handler: data => {
						this.addEquipmentItemFromUserInput(data.itemNumber);
					}
				}
			]
		});
		alert.present();
	}// }}}
	addEquipmentItemFromUserInput(itemNumber){// {{{
		//add equipment item to shippable items, and show as selected
		// present prompt if no item found
		console.log("NOT IMPLEMENTED YET");
		console.log("INPUT:" + itemNumber);
	}// }}}

}
