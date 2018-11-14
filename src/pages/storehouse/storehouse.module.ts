import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StorehousePage } from './storehouse';

@NgModule({
  declarations: [
    StorehousePage,
  ],
  imports: [
    IonicPageModule.forChild(StorehousePage),
  ],
})
export class StorehousePageModule {}
