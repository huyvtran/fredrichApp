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
import { CallNumber } from '@ionic-native/call-number';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { MediaCapture } from '@ionic-native/media-capture';
import { Media } from '@ionic-native/media';
import { IonicStorageModule } from '@ionic/storage';
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
import { ConstructionsiteEquipmentDetailPage } from '../pages/constructionsite-equipment-detail/constructionsite-equipment-detail';
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
import { ConstructionsiteAlertsPage } from '../pages/constructionsite-alerts/constructionsite-alerts';
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
import { EquipmentDamageReportDetailPage } from '../pages/equipment-damage-report-detail/equipment-damage-report-detail';

//MODULES (imported here because pages are included multiple times)
import { LoginPageModule } from '../pages/login/login.module';
import { ConstructionsiteReportDamagePageModule } from '../pages/constructionsite-report-damage/constructionsite-report-damage.module';

//PROVIDERS
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { CameraProvider } from '../providers/camera/camera';
import { ConstructionsiteProvider } from '../providers/constructionsite/constructionsite';
import { GlobalsProvider } from '../providers/globals/globals';
import { WeatherProvider } from '../providers/weather/weather';
import { TimeProvider } from '../providers/time/time';
import { GeolocationProvider } from '../providers/geolocation/geolocation';
import { ConstructionsiteContactsProvider } from '../providers/constructionsite-contacts/constructionsite-contacts';
import { TelephoneProvider } from '../providers/telephone/telephone';
import { FileHandlerProvider } from '../providers/file-handler/file-handler';
import { QrScannerProvider } from '../providers/qr-scanner/qr-scanner';
import { AudioProvider } from '../providers/audio/audio';
import { EquipmentProvider } from '../providers/equipment/equipment';
import { ConstructionsiteEquipmentProvider } from '../providers/constructionsite-equipment/constructionsite-equipment';
import { ConstructionsiteWorkersProvider } from '../providers/constructionsite-workers/constructionsite-workers';


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
			ConstructionsiteEquipmentDetailPage,
		ConstructionsiteMorePage,
			ConstructionsiteContactsPage,
			ConstructionsiteSettingsPage,
		ConstructionsiteEventsPage,
			ConstructionsiteReportEventPage,
		ConstructionsitePhotoPage,
			ConstructionsitePhotoEquipmentPage,
			ConstructionsitePhotoSitePage,
			ConstructionsitePhotoCameraPage,
		ConstructionsiteAlertsPage,
	RepairshopPage,
		RepairshopOverviewPage,
		RepairshopJobsPage,
		RepairshopEquipmentPage,
	StorehousePage,
		StorehouseOverviewPage,
		StorehouseInventoryPage,
		StorehouseLogisticsPage,
	SettingsPage,
	EquipmentDamageReportDetailPage,
    HomePage
// 	LoginPage,
// 	ConstructionsiteReportDamagePage,
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
	  LoginPageModule,
	ConstructionsiteReportDamagePageModule,
	  IonicModule.forRoot(MyApp),
	  IonicStorageModule.forRoot()
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
		ConstructionsiteEquipmentDetailPage,
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
		ConstructionsiteAlertsPage,
	RepairshopPage,
		RepairshopOverviewPage,
		RepairshopJobsPage,
		RepairshopEquipmentPage,
	StorehousePage,
		StorehouseOverviewPage,
		StorehouseInventoryPage,
		StorehouseLogisticsPage,
	SettingsPage,
	EquipmentDamageReportDetailPage,
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
		MediaCapture,
		Media,
		CameraProvider,
    ConstructionsiteProvider,
    ConstructionsiteContactsProvider,
    GlobalsProvider,
    WeatherProvider,
    TimeProvider,
    GeolocationProvider,
	 CallNumber,
	 BarcodeScanner,
    TelephoneProvider,
    FileHandlerProvider,
	 QrScannerProvider,
    AudioProvider,
    EquipmentProvider,
    ConstructionsiteEquipmentProvider,
    ConstructionsiteWorkersProvider
  ]
})
export class AppModule {}
