import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, 
  PopoverController, LoadingController, Platform, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { ApiProvider } from '../../../providers/api/api';
import { DataApiProvider } from '../../../providers/data-api/data-api';
import { AuthServiceProvider } from '../../../providers/auth-service/auth-service';
import { MapBrowserPage } from '../map-browser/map-browser';
import { MapPage } from '../map/map';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-punch',
  templateUrl: 'punch.html',
})
export class PunchPage implements OnInit {
  public whatDate: any
  public timer: any
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
  public log: any;
  public token: string;
  public user_id: string;
  public isCheckedIn: boolean = false
  public lastCheckedIn: boolean = false;
  public late: boolean = false;
  public isEarly: boolean = true;
  public weekday = new Array(7);

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public popoverCtrl: PopoverController,
    public authService: AuthServiceProvider,
    public api: ApiProvider,
    public dataApi: DataApiProvider,
    private loadingCtrl: LoadingController,
    private platform: Platform,
    private alertCtrl: AlertController
  ) {
  }

  ngOnInit() {
    this.weekday[0] = "Sunday";
    this.weekday[1] = "Monday";
    this.weekday[2] = "Tuesday";
    this.weekday[3] = "Wednesday";
    this.weekday[4] = "Thursday";
    this.weekday[5] = "Friday";
    this.weekday[6] = "Saturday";

    this.whatDate = Observable.interval(1000).map(x => new Date()).share();  // get current realtime
    this.timer = Observable.interval(1000).map(x => {
      let timeNow = new Date();
      let checkin = new Date(this.log.UserTag.tag_date);

      // Calculate the difference in milliseconds
      var difference_ms = timeNow.getTime() - checkin.getTime();
      //take out milliseconds
      difference_ms = difference_ms / 1000;
      var seconds = Math.floor(difference_ms % 60);
      difference_ms = difference_ms / 60;
      var minutes = Math.floor(difference_ms % 60);
      difference_ms = difference_ms / 60;
      var hours = Math.floor(difference_ms % 24);
      var days = Math.floor(difference_ms / 24);

      // check current day and set the OT time
      // OT start after day#_ot
      // default = 00:00:00
      let dataTimePart = this.findWhichOTDay(timeNow);

      let timeParts = dataTimePart.split(":");
      let cutOffTime = new Date(timeNow.getFullYear(), timeNow.getMonth(), timeNow.getDate(), parseInt(timeParts[0]), parseInt(timeParts[1]), 0, 0);

      if (timeNow.getTime() < cutOffTime.getTime()) {
        this.isEarly = true;
      } else {
        this.isEarly = false;
      }
      return days + ' day ' + hours + ' hour ' + minutes + ' min ' + seconds + ' sec';

    }).share();  // get current realtime

    setTimeout(function () {
      if (document.getElementById("clockout")) {
        document.getElementById("clockout").style.display = "none";
      }
    }, 1000);

    // console.log('start_hour: ' + this.dataApi.get('start_hour'))
    // this.getHistory();
  }

  findStartWeekDay() {
    let start_week = 'Monday'
    let count = 0;
    let day = 0;
    this.weekday.forEach(element => {
      if (this.dataApi.get('start_week') != '') {
        start_week = this.dataApi.get('start_week');
      }
      if (element == start_week) {
        day = count
      }
      count++;
    });
    return day;
  }

  findWhichOTDay(now: Date) {
    let OT = '00:00:00';
    let startWeek = this.findStartWeekDay();
    let currentDay = now.getDay();

    if (this.dataApi.get('day1_ot') != '' && this.dataApi.get('day2_ot') != '' && this.dataApi.get('day3_ot') != '' && this.dataApi.get('day4_ot') != '' && this.dataApi.get('day5_ot') != '') {
      if (startWeek == currentDay) {
        OT = this.dataApi.get('day1_ot');
      } else if (startWeek < currentDay && (currentDay - startWeek) < 5) {
        OT = this.dataApi.get('day' + (currentDay - startWeek + 1) + '_ot');
      }
    }
    return OT;
  }
  ionViewDidEnter() {
    // console.log('ionViewDidEnter PunchPage');
    this.data.name = this.dataApi.get('name');
    this.data.photo = this.dataApi.get('photo');
    this.data.token = this.dataApi.get('token');
    this.getHistory();
    // console.log('Device UUID is: ' + this.device.uuid);
    // console.log('Device model is: ' + this.device.model);
    // console.log('Device version is: ' + this.device.version);
    // console.log('Device platform is: ' + this.device.platform);
    // console.log('Device manufacturer is: ' + this.device.manufacturer);
    // console.log('Device serial is: ' + this.device.serial);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  checkin() {
    document.getElementById("cin-x").style.display = "block";
    document.getElementById("cin-y").style.display = "none";
    this.routeMe()
  }

  checkout() {
    document.getElementById("cin-k").style.display = "none";
    document.getElementById("cin-j").style.display = "block";
    this.routeMe();
  }

  presentPopover(ev) {
    let popover = this.popoverCtrl.create(ProfilePage);
    popover.present({
      ev: ev
    });
  }

  public logout() {
    // this.navCtrl.setRoot(HomePage);
  }

  private getHistory() {
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loading.present();
    this.api.get_latest()
      .then((result) => {
        loading.dismiss();
        this.log = result;
        // console.log(this.log.UserTag);
        if (this.log.UserTag) {
          if (this.log.UserTag.direction == '1') {
            // change to checkout
            this.isCheckedIn = true;
            let parts = this.log.UserTag.tag_date.split(' ');
            this.log.UserTag.tag_date = parts[0] + 'T' + parts[1] + '.000+08:00';
            console.log('Checkin: ' + this.log.UserTag.tag_date)
            this.lastCheckedIn = true;
          } else if (this.log.UserTag.direction == '2') {
            // change to checkin
            this.isCheckedIn = false;
          }
          this.dataApi.update('isCheckedIn', this.isCheckedIn);
          if (!this.isCheckedIn) {
            // console.log('check-in')
            document.getElementById("cin-x").style.display = "none";
            document.getElementById("cin-y").style.display = "block";
            document.getElementById("cin-k").style.display = "none";
            document.getElementById("cin-j").style.display = "block";
          } else {
            // console.log('check-out')
            if (document.getElementById("cin-x") || document.getElementById("cin-y") || document.getElementById("cin-k") || document.getElementById("cin-j")) {
              document.getElementById("cin-x").style.display = "block";
              document.getElementById("cin-y").style.display = "none";
              document.getElementById("cin-k").style.display = "block";
              document.getElementById("cin-j").style.display = "none";
            }
          }
        } else {
          //force check-in for first timer
          this.isCheckedIn = true;
          if (document.getElementById("cin-x")) {
            document.getElementById("cin-x").style.display = "none";
            document.getElementById("cin-y").style.display = "block";
            document.getElementById("cin-k").style.display = "none";
            document.getElementById("cin-j").style.display = "block";
          }
        }
        // console.log('isCheckedIn: ' + this.isCheckedIn);
      }, (err) => {
        loading.dismiss();
        alert(err);
      });
  }

  private routeMe() {
    if (this.platform.is('core')) {
      this.navCtrl.push(MapBrowserPage, { isCheckedIn: this.isCheckedIn, isLate: this.late, isEarly: this.isEarly })
    } else {
      this.navCtrl.push(MapPage, { isCheckedIn: this.isCheckedIn, isLate: this.late, isEarly: this.isEarly })
    }
  }

  showAlert(message: string) {
    console.log('alert')
    let confirm = this.alertCtrl.create({
      title: 'Welcome..',
      message: message,
      buttons: [
        {
          text: 'ok',
          handler: () => {
            console.log('ok clicked');
          }
        },

      ]
    });
    confirm.present();
  }

  public isLateCheckin() {
    let timeNow = new Date();
    let start_hour = '08:30:00';

    if (this.dataApi.get('start_hour')) {
      start_hour = this.dataApi.get('start_hour')
    }
    // console.log('start_hour: ' + start_hour)
    let timeParts = start_hour.split(":");
    let inputTime = new Date(timeNow.getFullYear(), timeNow.getMonth(), timeNow.getDate(), parseInt(timeParts[0]), parseInt(timeParts[1]), 0, 0);

    let diff = timeNow.getTime() - inputTime.getTime();

    if (diff > 1 * 60 * 1000 && this.isCheckedIn == false) {
      this.late = true;
      // console.log('isLate')
      return true;
    } else {
      this.late = false;
      // console.log('!isLate')
      return false;
    }
  }

  public isEarlyCheckout() {

    if (this.isEarly) {
      return true;
    } else {
      return false;
    }

  }

}
