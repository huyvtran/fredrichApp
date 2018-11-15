import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StorehouseInventoryPage } from './storehouse-inventory';

@NgModule({
  declarations: [
    StorehouseInventoryPage,
  ],
  imports: [
    IonicPageModule.forChild(StorehouseInventoryPage),
  ],
})
export class StorehouseInventoryPageModule {}
