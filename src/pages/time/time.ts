import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PunchPage } from '../tms/punch/punch';
import { MapPage } from '../tms/map/map';
import { DownloadPage } from '../tms/download/download';

/**
 * Generated class for the TimePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-time',
  templateUrl: 'time.html',
})
export class TimePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimePage');
  

}
public viewPunch() {
  this.navCtrl.push(PunchPage);
}
public viewMap() {
  this.navCtrl.push(MapPage);
}
public viewDownload() {
  this.navCtrl.push(DownloadPage);
}
}
