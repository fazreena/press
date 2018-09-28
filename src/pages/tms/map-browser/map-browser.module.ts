import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapBrowserPage } from './map-browser';

@NgModule({
  declarations: [
    MapBrowserPage,
  ],
  imports: [
    IonicPageModule.forChild(MapBrowserPage),
  ],
})
export class MapBrowserPageModule {}
