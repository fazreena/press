import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { ApiProvider } from '../../../providers/api/api';
import { DataApiProvider } from '../../../providers/data-api/data-api';

/**
 * Generated class for the ModalInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-info',
  templateUrl: 'modal-info.html',
})
export class ModalInfoPage {
  public latitude: number;
  public longitude: number;
  public address: string;
  public time: string;
  data: any;
  isCheckedIn: boolean;
  public buttonColor: string;
  public buttonText: string;
  public enableBtn: boolean = false;
  public reasons: any;
  public reason: string;
  public mobile: number;
  public description: string;
  public log: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public api: ApiProvider,
    public dataApi: DataApiProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private device: Device
  ) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ngOnInit() {
    this.latitude = parseFloat(this.navParams.get('Latitude'));
    this.longitude = parseFloat(this.navParams.get('Longitude'));
    // this.reason = this.navParams.get('reason');
    this.reasons = this.navParams.get('reasons');
    this.address = this.navParams.get('Address');
    this.time = this.navParams.get('Time');
    this.isCheckedIn = (this.navParams.get('isCheckedIn') == 'true');
    this.buttonColor = this.navParams.get('buttonColor');
    this.buttonText = this.navParams.get('buttonText');
    this.enableBtn = (this.navParams.get('enableBtn') == 'true');
    this.log = this.device.cordova
      + ':' + this.device.manufacturer
      + ':' + this.device.model
      + ':' + this.device.platform
      + ':' + this.device.version
      + ':' + this.device.serial
    console.log('log: ' + this.log)
  }

  private submitTags(direction: number) {
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });

    let latitude: any;
    let longitude: any;
    let timestamp: any;
    let address: any;
    console.log('reason: ' + this.reason)
    loading.present();
    if (!this.latitude && !this.longitude) {
      timestamp = this.time;
      address = null;
      console.log('no lat long')
    } else {
      timestamp = new Date();
      console.log('with lat long')
      address = this.address;

    }
    latitude = this.latitude;
    longitude = this.longitude;

    this.api.submitTag(direction, latitude, longitude, timestamp, this.reason, this.log, address, this.description)
      .then((result) => {
        loading.dismiss();
        this.data = result;
        if (this.data.result) {
          this.isCheckedIn = true;
        } else {
          this.isCheckedIn = false;
        }
        this.dataApi.update('isCheckedIn', this.isCheckedIn);
      }, (err) => {
        loading.dismiss();
        alert(err);
      });
  }

  submitNativeData() {
    let confirm = this.alertCtrl.create({
      title: 'Confirmation Required!',
      message: 'Do you agree to use this location for your attendance?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked ');
            this.submitTags(0);
            this.viewCtrl.dismiss({ isSubmitted: true });
          }
        }
      ]
    });
    confirm.present();

  }

  submitted() {
    let confirm = this.alertCtrl.create({
      title: 'Congratulation!',
      message: 'Have a nice day.',
      buttons: [
        {
          text: 'ok',
          handler: () => {
            console.log('ok clicked');
            // this.navCtrl.setRoot(PunchPage);
            // this.navCtrl.popToRoot();
          }
        },

      ]
    });
    confirm.present();
    confirm.dismiss();

  }

  public isAllow() {
    let status = false;
    if (this.reason == '8' && !this.description) { // OT
      status = false;
    } else if (this.reason == '7' && !this.description) { // others
      status = false;
    } else if (this.reason) {
      status = true;
    }

    return status;
  }
}
