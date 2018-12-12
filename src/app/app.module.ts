import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Geolocation } from '@ionic-native/geolocation';
import { CameraPreview } from '@ionic-native/camera-preview';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
// import { CameraPreviewRect } from '@ionic-native';

import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
//PAGES
import { HomePage } from '../pages/home/home';
import { SelectConstructionsitePage } from '../pages/select-constructionsite/select-constructionsite';
import { ConstructionsitePage } from '../pages/constructionsite/constructionsite';
import { ConstructionsiteOverviewPage } from '../pages/constructionsite-overview/constructionsite-overview';
import { ConstructionsiteSetGeolocationPage } from '../pages/constructionsite-set-geolocation/constructionsite-set-geolocation';
import { ConstructionsiteTimerecordingPage } from '../pages/constructionsite-timerecording/constructionsite-timerecording';
import { ConstructionsiteDailyreportPage } from '../pages/constructionsite-dailyreport/constructionsite-dailyreport';
import { ConstructionsiteEquipmentPage } from '../pages/constructionsite-equipment/constructionsite-equipment';
import { ConstructionsiteSettingsPage } from '../pages/constructionsite-settings/constructionsite-settings';
import { ConstructionsiteContactsPage } from '../pages/constructionsite-contacts/constructionsite-contacts';
import { ConstructionsiteEventsPage } from '../pages/constructionsite-events/constructionsite-events';
import { ConstructionsiteReportEventPage } from '../pages/constructionsite-report-event/constructionsite-report-event';
import { ConstructionsiteReportDamagePage } from '../pages/constructionsite-report-damage/constructionsite-report-damage';
import { ConstructionsiteMorePage } from '../pages/constructionsite-more/constructionsite-more';
import { ConstructionsitePhotoPage } from '../pages/constructionsite-photo/constructionsite-photo';
import { ConstructionsitePhotoEquipmentPage} from '../pages/constructionsite-photo-equipment/constructionsite-photo-equipment';
import { ConstructionsitePhotoSitePage} from '../pages/constructionsite-photo-site/constructionsite-photo-site';
import { ConstructionsitePhotoCameraPage} from '../pages/constructionsite-photo-camera/constructionsite-photo-camera';
import { RepairshopPage} from '../pages/repairshop/repairshop';
import { RepairshopOverviewPage} from '../pages/repairshop-overview/repairshop-overview';
import { RepairshopJobsPage} from '../pages/repairshop-jobs/repairshop-jobs';
import { RepairshopEquipmentPage} from '../pages/repairshop-equipment/repairshop-equipment';
import { StorehousePage } from '../pages/storehouse/storehouse';
import { StorehouseOverviewPage} from '../pages/storehouse-overview/storehouse-overview';
import { StorehouseInventoryPage} from '../pages/storehouse-inventory/storehouse-inventory';
import { StorehouseLogisticsPage} from '../pages/storehouse-logistics/storehouse-logistics';
import { SettingsPage } from '../pages/settings/settings';
import { LoginPage } from '../pages/login/login';
import { CameraViewPage } from '../pages/camera-view/camera-view';

//MODULES
import { LoginPageModule } from '../pages/login/login.module';

//PROVIDERS
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { CameraProvider } from '../providers/camera/camera';
import { ConstructionsiteProvider } from '../providers/constructionsite/constructionsite';
import { GlobalsProvider } from '../providers/globals/globals';
import { WeatherProvider } from '../providers/weather/weather';
import { TimeProvider } from '../providers/time/time';
import { GeolocationProvider } from '../providers/geolocation/geolocation';


@NgModule({
  declarations: [
    MyApp,
	CameraViewPage,
	SelectConstructionsitePage,
	ConstructionsitePage,
		ConstructionsiteOverviewPage,
			ConstructionsiteSetGeolocationPage,
		ConstructionsiteTimerecordingPage,
		ConstructionsiteDailyreportPage,
		ConstructionsiteEquipmentPage,
		ConstructionsiteMorePage,
			ConstructionsiteContactsPage,
			ConstructionsiteSettingsPage,
		ConstructionsiteEventsPage,
			ConstructionsiteReportEventPage,
			ConstructionsiteReportDamagePage,
		ConstructionsitePhotoPage,
			ConstructionsitePhotoEquipmentPage,
			ConstructionsitePhotoSitePage,
			ConstructionsitePhotoCameraPage,
	RepairshopPage,
		RepairshopOverviewPage,
		RepairshopJobsPage,
		RepairshopEquipmentPage,
	StorehousePage,
		StorehouseOverviewPage,
		StorehouseInventoryPage,
		StorehouseLogisticsPage,
	SettingsPage,
// 	LoginPage,
    HomePage
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
	  LoginPageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
	CameraViewPage,
	SelectConstructionsitePage,
	ConstructionsitePage,
		ConstructionsiteOverviewPage,
			ConstructionsiteSetGeolocationPage,
		ConstructionsiteTimerecordingPage,
		ConstructionsiteDailyreportPage,
		ConstructionsiteEquipmentPage,
		ConstructionsiteMorePage,
			ConstructionsiteContactsPage,
			ConstructionsiteSettingsPage,
		ConstructionsiteEventsPage,
			ConstructionsiteReportEventPage,
			ConstructionsiteReportDamagePage,
		ConstructionsitePhotoPage,
			ConstructionsitePhotoEquipmentPage,
			ConstructionsitePhotoSitePage,
			ConstructionsitePhotoCameraPage,
	RepairshopPage,
		RepairshopOverviewPage,
		RepairshopJobsPage,
		RepairshopEquipmentPage,
	StorehousePage,
		StorehouseOverviewPage,
		StorehouseInventoryPage,
		StorehouseLogisticsPage,
	SettingsPage,
	LoginPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
		Diagnostic,
		Geolocation,
		File,
		Transfer,
		FilePath,
		AuthServiceProvider,
		CameraPreview,
		Camera,
		CameraProvider,
    ConstructionsiteProvider,
    GlobalsProvider,
    WeatherProvider,
    TimeProvider,
    GeolocationProvider
  ]
})
export class AppModule {}
