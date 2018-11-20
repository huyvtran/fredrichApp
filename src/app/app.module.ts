import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Geolocation } from '@ionic-native/geolocation';
import { File } from '@ionic-native/file';
import { CameraPreview } from '@ionic-native/camera-preview';
// import { CameraPreviewRect } from '@ionic-native';

import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
//PAGES
import { HomePage } from '../pages/home/home';
import { SelectConstructionsitePage } from '../pages/select-constructionsite/select-constructionsite';
import { ConstructionsitePage } from '../pages/constructionsite/constructionsite';
import { ConstructionsiteOverviewPage } from '../pages/constructionsite-overview/constructionsite-overview';
import { ConstructionsiteTimerecordingPage } from '../pages/constructionsite-timerecording/constructionsite-timerecording';
import { ConstructionsiteDailyreportPage } from '../pages/constructionsite-dailyreport/constructionsite-dailyreport';
import { ConstructionsiteEquipmentPage } from '../pages/constructionsite-equipment/constructionsite-equipment';
import { ConstructionsiteContactsPage } from '../pages/constructionsite-contacts/constructionsite-contacts';
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


@NgModule({
  declarations: [
    MyApp,
	CameraViewPage,
	SelectConstructionsitePage,
	ConstructionsitePage,
		ConstructionsiteOverviewPage,
		ConstructionsiteTimerecordingPage,
		ConstructionsiteDailyreportPage,
		ConstructionsiteEquipmentPage,
		ConstructionsiteContactsPage,
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
		ConstructionsiteTimerecordingPage,
		ConstructionsiteDailyreportPage,
		ConstructionsiteEquipmentPage,
		ConstructionsiteContactsPage,
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
		AuthServiceProvider,
		CameraPreview,
		CameraProvider
  ]
})
export class AppModule {}
