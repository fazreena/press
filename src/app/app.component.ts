import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AttendancePage } from '../pages/tms/attendance/attendance';
import { DownloadPage } from '../pages/tms/download/download';
import { PunchPage } from '../pages/tms/punch/punch';
import { PersonalInformationPage } from '../pages/pi/personal-information/personal-information';
import { FamilyPage } from '../pages/pi/family/family';
import { EducationPage } from '../pages/pi/education/education';
import { EaPage } from '../pages/ps/ea/ea';
import { PaymentHistoryPage } from '../pages/ps/payment-history/payment-history';
import { ContactPage } from '../pages/contact/contact';
import { AboutPage } from '../pages/about/about';
// import { MapPage } from '../tms/map/map';


import { TimePage } from '../pages/Time/Time';
import { SalaryPage } from '../pages/Salary/salary';
import { StaffPage } from '../pages/Staff/staff';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any, icon: string }>;

  constructor(
    public platform: Platform,
    public events: Events,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon:'ios-home' },
      { title: 'Staff Profile', component: StaffPage,icon:'ios-people'  },
      { title: 'Time Attendance', component:TimePage, icon: 'ios-alarm' },
      { title: 'Dashboard', component: AboutPage, icon:'ios-information-circle'},
      { title: 'Salary/Claim', component: SalaryPage, icon:'logo-bitcoin' }
    ];
  }

//     events.subscribe('menu:choosen', (menu) => {
//       // user and time are the same arguments passed in `events.publish(user, time)`
//       console.log('Menu choosen', menu);
//       console.log('Display submenu for ' + menu);

//       switch (menu) {
//         case 'tms':
//           this.pages = [
//             { title: 'Home', component: HomePage },
//             { title: 'Check In/Out', component: PunchPage },
//             { title: 'Attendance List', component: AttendancePage },
//             { title: 'Report', component: DownloadPage },
//           ];
//           break;
//         case 'pi':
//         this.pages = [
//           { title: 'Home', component: HomePage },
//           { title: 'Personal Information', component:PersonalInformationPage },
//           { title: 'Family Information', component: FamilyPage },
//           { title: 'Education', component: EducationPage },
//         ];
//           // put your code here
//           break;
//         case 'ps':
//         this.pages = [
//           { title: 'Home', component: HomePage },
//           { title: 'Ea', component:EaPage },
//           { title: 'Payment History', component: PaymentHistoryPage },
//           { title: 'Payment Slip', component: PaymentHistoryPage},
//         ];
//           // put your code here
//           break;
//         default:
//           console.log('No menu selected. Display home menu');
//           this.pages = [
//             { title: 'Home', component: HomePage },
//             { title: 'Staff Profile', component: StaffPage},
//             { title: 'Time Attendance', component:TimePage },
//             { title: 'Dashboard', component: AboutPage},
//             { title: 'Salary/Claim', component: SalaryPage }
//           ];
//       }

//     });
//   }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
