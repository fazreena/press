import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { DataApiProvider } from '../../../providers/data-api/data-api';
import { ApiProvider } from '../../../providers/api/api';
import { Reason } from '../models/reason';

@IonicPage()
@Component({
  selector: 'page-map-browser',
  templateUrl: 'map-browser.html',
})
export class MapBrowserPage {

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
  // public info: Staff = new Staff();
  public info: any;
  public reasons: any;
  public reason: string;
  public mobile: number;
  public description: string = '';
  respon: any;
  isCheckedIn: boolean;
  public log: any;
  public isLate: boolean = false;
  public isEarly: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dataApi: DataApiProvider,
    public api: ApiProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private device: Device
  ) {
  }

  ionViewDidEnter() {

    console.log('ionViewDidEnter SelfPage');
    this.data.name = this.dataApi.get('name');
    this.data.token = this.dataApi.get('token');
    this.isLate = this.navParams.get('isLate');
    this.isEarly = this.navParams.get('isEarly');

    console.log('data islate: ' + this.isLate)
    this.get_info();
    this.get_reasons();
    this.log = this.device.cordova
      + ':' + this.device.manufacturer
      + ':' + this.device.model
      + ':' + this.device.platform
      + ':' + this.device.version
      + ':' + this.device.serial

    console.log('log: ' + this.log)

  }

  private get_info() {
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 5000
    });
    loading.present();
    this.api.get_info(this.data.token)
      .then((result) => {
        loading.dismiss();
        this.info = result;
        // this.info = result as Staff;
        console.log(this.info);

      }, (err) => {
        loading.dismiss();
        alert(err);
      });
  }

  private get_reasons() {
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loading.present();
    let data: any
    this.api.get_reasons()
      .then((result) => {
        data = result as Reason[];
        loading.dismiss()
      }, (err) => {
        loading.dismiss()
        alert(err);
      })
      .then(x => {
        console.log('data length: ' + data.length)
        console.log('data isLate: ' + this.isLate)
        if (data.length > 0 && this.isLate && !this.isCheckedIn) {
          console.log('data isLate ')
          this.reasons = data.filter(el => {
            if (el.Reason.name !== 'Normal') {
              return el;
            }
          });
        } else if (data.length > 0 && this.isEarly && this.isCheckedIn) {
          console.log('data isEarly ')
          this.reasons = data.filter(el => {
            if (el.Reason.name !== 'Normal') {
              return el;
            }
          });
        } else if (data.length > 0) {
          this.reasons = data
        }
        console.log('reasons: ' + JSON.stringify(this.reasons))

      });
  }

  public submitNativeData() {
    let confirm = this.alertCtrl.create({
      title: 'Confirmation Required!',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked ');
            this.submitTags(0);
          }
        }
      ]
    });
    confirm.present();

  }

  private submitTags(direction: number) {
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });

    let latitude: any = 0;
    let longitude: any = 0;
    let timestamp: any;
    let address: any;
    console.log('reason: ' + this.reason)
    loading.present();

    timestamp = new Date();
    this.info.forEach(element => {
      if (element.Member.location) {
        address = element.Member.location;
      } else {
        address = 'Location address is not available';
      }
    });

    this.api.submitTag(direction, latitude, longitude, timestamp, this.reason, this.log, address, this.description)
      .then((result) => {
        loading.dismiss();
        this.respon = result;
        if (this.respon.result) {
          this.isCheckedIn = true;
        } else {
          this.isCheckedIn = false;
        }
        this.dataApi.update('isCheckedIn', this.isCheckedIn);
        this.navCtrl.pop();
        // this.submitted();
      }, (err) => {
        loading.dismiss();
        alert(err);
      });
  }

  public isAllow() {
    let status = false;
    if (this.reason == '8' && !this.description) { // OT
      status = false;
    } else if (this.reason == '7' && !this.description) { //others
      status = false;
    } else if (this.reason) {
      status = true;
    }

    return status;
  }

}
