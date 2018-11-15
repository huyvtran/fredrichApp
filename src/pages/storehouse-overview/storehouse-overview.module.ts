import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StorehouseOverviewPage } from './storehouse-overview';

@NgModule({
  declarations: [
    StorehouseOverviewPage,
  ],
  imports: [
    IonicPageModule.forChild(StorehouseOverviewPage),
  ],
})
export class StorehouseOverviewPageModule {}
