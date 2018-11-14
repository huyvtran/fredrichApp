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
import { StorehousePage } from '../pages/storehouse/storehouse';
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
	StorehousePage,
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
	StorehousePage,
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
