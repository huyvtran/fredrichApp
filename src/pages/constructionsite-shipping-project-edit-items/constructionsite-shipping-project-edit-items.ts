import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
		public shipping: ConstructionsiteShippingProvider
	) {
		this.project = this.navParams.get('project');
		this.prepareShippableItems();
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstructionsiteShippingProjectEditItemsPage');
  }
	ionViewWillLeave() {
		this.setSelectedItems();
	}
	toggleItem(entry){
		entry.isSelected = !entry.isSelected;
	}

	prepareShippableItems(){// {{{
		this.shippableItems = [];
		let itemList = this.shipping.getShippableItems();
		for (let item of itemList){
			let entry = {isSelected:this.project.containsItem(item), item:item}
			this.shippableItems.push(entry);
		}
		console.log(this.shippableItems);
	}// }}}

	okButtonClicked(){
		//leaving view will set selected items
// 		this.setSelectedItems();
		this.navCtrl.pop();
	}
	setSelectedItems(){// {{{
		let selectedItems = this.getSelectedItems();
		this.project.setItemList(selectedItems);

// 		console.log(selectedItems);
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
	isPartOfOtherShippingProject(entry){
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
	}

}
