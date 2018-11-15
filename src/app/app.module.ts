import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SelectConstructionsitePage } from '../pages/select-constructionsite/select-constructionsite';
import { ConstructionsitePage } from '../pages/constructionsite/constructionsite';
import { ConstructionsiteOverviewPage } from '../pages/constructionsite-overview/constructionsite-overview';
import { ConstructionsiteTimerecordingPage } from '../pages/constructionsite-timerecording/constructionsite-timerecording';
import { ConstructionsiteDailyreportPage } from '../pages/constructionsite-dailyreport/constructionsite-dailyreport';
import { ConstructionsiteEquipmentPage } from '../pages/constructionsite-equipment/constructionsite-equipment';
import { ConstructionsiteContactsPage } from '../pages/constructionsite-contacts/constructionsite-contacts';
import { RepairshopPage} from '../pages/repairshop/repairshop';
import { RepairshopOverviewPage} from '../pages/repairshop-overview/repairshop-overview';
import { RepairshopJobsPage} from '../pages/repairshop-jobs/repairshop-jobs';
import { RepairshopEquipmentPage} from '../pages/repairshop-equipment/repairshop-equipment';
import { StorehousePage } from '../pages/storehouse/storehouse';
import { StorehouseOverviewPage} from '../pages/storehouse-overview/storehouse-overview';
import { StorehouseInventoryPage} from '../pages/storehouse-inventory/storehouse-inventory';
import { StorehouseLogisticsPage} from '../pages/storehouse-logistics/storehouse-logistics';
import { SettingsPage } from '../pages/settings/settings';


@NgModule({
  declarations: [
    MyApp,
	SelectConstructionsitePage,
	ConstructionsitePage,
	ConstructionsiteOverviewPage,
	ConstructionsiteTimerecordingPage,
	ConstructionsiteDailyreportPage,
	ConstructionsiteEquipmentPage,
	ConstructionsiteContactsPage,
	RepairshopPage,
	RepairshopOverviewPage,
	RepairshopJobsPage,
	RepairshopEquipmentPage,
	StorehousePage,
	StorehouseOverviewPage,
	StorehouseInventoryPage,
	StorehouseLogisticsPage,
	SettingsPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
	SelectConstructionsitePage,
	ConstructionsitePage,
	ConstructionsiteOverviewPage,
	ConstructionsiteTimerecordingPage,
	ConstructionsiteDailyreportPage,
	ConstructionsiteEquipmentPage,
	ConstructionsiteContactsPage,
	RepairshopPage,
	RepairshopOverviewPage,
	RepairshopJobsPage,
	RepairshopEquipmentPage,
	StorehousePage,
	StorehouseOverviewPage,
	StorehouseInventoryPage,
	StorehouseLogisticsPage,
	SettingsPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
