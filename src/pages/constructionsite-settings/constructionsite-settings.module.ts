import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConstructionsiteSettingsPage } from './constructionsite-settings';

@NgModule({
  declarations: [
    ConstructionsiteSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(ConstructionsiteSettingsPage),
  ],
})
export class ConstructionsiteSettingsPageModule {}
