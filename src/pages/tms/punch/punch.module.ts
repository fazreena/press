import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PunchPage } from './punch';

@NgModule({
  declarations: [
    PunchPage,
  ],
  imports: [
    IonicPageModule.forChild(PunchPage),
  ],
})
export class PunchPageModule {}
