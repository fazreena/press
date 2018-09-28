import { PunchPage } from './../punch/punch';
import { AttendancePage } from './../attendance/attendance';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { DataApiProvider } from '../../../providers/data-api/data-api';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public data = {
    token: '',
    location: '',
    user_id: '',
    name: '',
    photo: '',
    email: '',
    serverPath: '',
    activate: false,
    limit: '5'
  };

  constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public appCtrl: App,
        public dataApi: DataApiProvider
      )
    {
  }

  ionViewWillEnter(){
   console.log('ionViewWillEnter ProfilePage');
    this.data.name = this.dataApi.get('name');
    this.data.token = this.dataApi.get('token');
  }

  public navattendance() {
    // this.viewCtrl.dismiss().then(() => this.navCtrl.setRoot(AttendancePage));
    this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().push(AttendancePage);
  }

  public navpunch() {
    // this.viewCtrl.dismiss().then(() => this.navCtrl.setRoot(PunchPage));
    this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().push(PunchPage);
  }

}
