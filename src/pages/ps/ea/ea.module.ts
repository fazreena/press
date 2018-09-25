import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EaPage } from './ea';

@NgModule({
  declarations: [
    EaPage,
  ],
  imports: [
    IonicPageModule.forChild(EaPage),
  ],
})
export class EaPageModule {}
