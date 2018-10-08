import { LocationAccuracyProvider } from '../providers/location-accuracy/location-accuracy';
import { LocationTrackerProvider } from '../providers/location-tracker/location-tracker';
import { DownloadPage } from './../pages/tms/download/download';
import { FamilyPage } from './../pages/pi/family/family';
import { EducationPage } from './../pages/pi/education/education';
import { PersonalInformationPage } from './../pages/pi/personal-information/personal-information';
import { AttendancePage } from './../pages/tms/attendance/attendance';
import { PunchPage } from './../pages/tms/punch/punch';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { DatePipe } from '@angular/common';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { StaffPage } from '../pages/Staff/staff';
import { TimePage } from '../pages/Time/Time';
import { AboutPage } from '../pages/about/about';
import { SalaryPage } from '../pages/Salary/salary';
// import { MapPage } from '../tms/map/map';
// import{ tmspage } from '../pages/tms';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataApiProvider } from '../providers/data-api/data-api';
import { PaymentSlipPage } from '../pages/ps/payment-slip/payment-slip';
import { EaPage } from '../pages/ps/ea/ea';
import { PaymentHistoryPage } from '../pages/ps/payment-history/payment-history';
import { ApiProvider } from '../providers/api/api';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';


const tms = [PunchPage, AttendancePage, DownloadPage];
const pi = [PersonalInformationPage, EducationPage, FamilyPage];
const ps = [PaymentSlipPage, EaPage, PaymentHistoryPage];

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ...tms,
    ...pi,
    ...ps,
    StaffPage,
    TimePage,
    AboutPage,
    SalaryPage,
  
    
    
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ...tms,
    ...pi,
    ...ps,
    StaffPage,
    TimePage,
    AboutPage,
    SalaryPage,




    
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataApiProvider,
    ApiProvider,
    AuthServiceProvider,
    LocationAccuracyProvider,
    LocationTrackerProvider,
    DatePipe,
  

  ]
})
export class AppModule {}
