import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, 
  AlertController, Modal, ModalController, ToastController } from 'ionic-angular';
import L from "leaflet";
import { Reason } from '../models/reason';
import { ApiProvider } from '../../../providers/api/api';
import { DataApiProvider } from '../../../providers/data-api/data-api';
import { AuthServiceProvider } from '../../../providers/auth-service/auth-service';
import { LocationTrackerProvider } from '../../../providers/location-tracker/location-tracker';
import { LocationAccuracyProvider } from '../../../providers/location-accuracy/location-accuracy';
import { ModalInfoPage } from '../modal-info/modal-info';
import { AttendancePage } from '../attendance/attendance';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  lmap: L.Map;
  center: L.PointTuple;

  mapElement: HTMLElement;
  public reason: string = '1'; //normal
  public isCheckedIn: boolean = false;
  public latitude: number
  public longitude: number
  public address: any
  public myaddress: string
  public timestamp: string
  public data: any
  public nativeDevice: boolean;
  latLng: any;
  lat: number;
  long: number;
  account: any;
  active: any;
  public buttonText = 'Check In';
  public buttonColor = 'register';
  public disableBtn = true;
  isInitialized = false;
  public reasons: any;
  public isLate: boolean = false;
  public isEarly: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public api: ApiProvider,
    public dataApi: DataApiProvider,
    public locator: LocationTrackerProvider,
    public authService: AuthServiceProvider,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public locationAccuracy: LocationAccuracyProvider,
  ) {
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter MapPage');
    this.isCheckedIn = this.navParams.get('isCheckedIn');
    this.isLate = this.navParams.get('isLate');
    this.isEarly = this.navParams.get('isEarly');

    console.log('late: ' + this.isLate)
    console.log('early: ' + this.isEarly)
    this.get_location();

    //RapidKL HQ
    this.latitude = 0;
    this.longitude = 0;

    this.showToast('bottom');
    setTimeout(() => {
      this.relocate();
    }, 4500);

  }

  public relocate() {
    this.get_location();
    this.get_reasons();
    this.initMap();
  }

  showToast(position: string) {
    let toast = this.toastCtrl.create({
      message: 'Initializing your location...',
      duration: 4500,
      position: position
    });

    toast.present(toast);
    this.initMap();
  }

  initMap() {
    if (this.latitude == null && this.longitude == null) {
      this.showAlert();
    } else {
      this.center = [this.latitude, this.longitude];

      if (this.lmap != null) {
        this.lmap.remove();
      }
      this.lmap = L.map('map', {
        center: this.center,
        zoom: 16
      });
      //Add Marker, Popup and Circle On Map
      // L.marker(L.latLng([this.latitude, this.longitude])).bindPopup("<div align='center'><b>You are here!</b><hr><table><tr><td>Latitude&nbsp;</td><td>:</td><td>&nbsp;" + this.latitude + "</td></tr><tr><td>Longitude&nbsp;</td><td>:</td><td>&nbsp;" + this.longitude + "</td></tr></table></div>").openPopup().addTo(this.lmap);
      L.marker(L.latLng([this.latitude, this.longitude])).bindPopup("<div align='center'><b>You are here!</b><hr><div style='width:18em;word-wrap:break-word;text-align:left;'>" + this.myaddress + "</div></div>").openPopup().addTo(this.lmap);
      L.circle([this.latitude, this.longitude], { radius: 200 }).addTo(this.lmap);

      //Add OSM Layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(this.lmap);
    }

  }

  get_location(): void {
    this.locationAccuracy.enableGPS();
    this.locator.getLocation();

    if (this.locator.address) {
      this.myaddress = '';
      if (this.locator.address.subThoroughfare) {
        this.myaddress += this.locator.address.subThoroughfare + ", ";
      }
      if (this.locator.address.thoroughfare) {
        this.myaddress += this.locator.address.thoroughfare + ", ";
      }
      if (this.locator.address.subLocality) {
        this.myaddress += this.locator.address.subLocality + ", ";
      }
      if (this.locator.address.locality) {
        this.myaddress += this.locator.address.locality + ", ";
      }
      if (this.locator.address.postalCode) {
        this.myaddress += this.locator.address.postalCode + ", ";
      }
      if (this.locator.address.countryName) {
        this.myaddress += this.locator.address.countryName;
      }
    } else {
      this.myaddress = 'Location address is not available';
    }

    this.latitude = this.locator.latitude
    this.longitude = this.locator.longitude
    this.timestamp = this.locator.timestamp;
    if (this.locator.latitude > 0) {
      this.disableBtn = false;
    }

    console.log('button: ' + this.disableBtn);
    this.active = this.dataApi.get('activate');
    console.log('active: ' + this.active);
    console.log('isCheckedIn: ' + this.isCheckedIn);
    if (this.active) {
      // this.isCheckedIn = (this.dataApi.get('isCheckedIn') == 'true');
      if (!this.isCheckedIn) {
        this.buttonColor = 'secondary';
        this.buttonText = 'Check In'
      } else {
        this.buttonColor = 'sign';
        this.buttonText = 'Check Out';
      }
      console.log('buttonColor: ' + this.buttonColor);
      console.log('buttonText: ' + this.buttonText);

    }
  }

  ionViewDidLeave() {
    if (this.locator.watchID) {
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  public navigate() {

    let modal: Modal = this.modalCtrl.create(ModalInfoPage,
      {
        'Latitude': this.latitude, 'Longitude': this.longitude, 
        'Address': this.myaddress, 'Time': this.timestamp,
        'isCheckedIn': this.isCheckedIn, 'buttonColor': this.buttonColor, 'buttonText': this.buttonText,
        'reasons': this.reasons, 'reason': this.reason,
        'enableBtn': 'true'
      });
    modal.present();

    modal.onDidDismiss((data) => {
      if (data) {
        this.navCtrl.setRoot(AttendancePage);
      }
    })
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'No connection',
      subTitle: "Looks like there's a problem with your network location. Try again later.",
      buttons: ['OK']
    });
    alert.present();
  }

  private get_reasons() {
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loading.present();
    this.api.get_reasons()
      .then((result) => {
        this.data = result as Reason[];
        loading.dismiss()
      }, (err) => {
        loading.dismiss()
        alert(err);
      })
      .then(x => {
        if (this.data.length > 0 && this.isLate && !this.isCheckedIn) {
          this.reasons = this.data.filter(el => {
            if(el.Reason.name !== 'Normal') {
              return el;
            }
          });
        } else if (this.data.length > 0 && this.isEarly && this.isCheckedIn) {
          this.reasons = this.data.filter(el => {
            if(el.Reason.name !== 'Normal') {
              return el;
            }
          });
        } else if (this.data.length > 0) {
          this.reasons = this.data
        }
        
      });
  }
}
