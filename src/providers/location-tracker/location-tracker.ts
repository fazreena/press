import { Platform } from 'ionic-angular';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LocationTrackerProvider {

  watchID: any
  address: any
  latitude: any
  longitude: any
  timestamp: any

  constructor(
    public http: Http,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private platform: Platform
  ) {
    console.log('Hello SimpleLocationTrackerProvider Provider');
  }

  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude
      this.longitude = resp.coords.longitude

      console.log(resp.coords.latitude)
      console.log(resp.coords.longitude)

      if (this.platform.is('cordova')) {
        this.get_address(this.latitude, this.longitude);
      }

    }).catch((error) => {
      console.log('Error getting location', error);
    });

    this.watchID = this.geolocation.watchPosition();
    this.watchID.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      this.latitude = data.coords.latitude
      this.longitude = data.coords.longitude
    });
    this.timestamp = new Date();
  }

  get_address(latitute: number, longitute: number) {
    this.nativeGeocoder.reverseGeocode(latitute, longitute)
      .then((result: NativeGeocoderReverseResult[]) => {
        this.address = result
        console.log(JSON.stringify(result))

      })
      .catch((error: any) => {
        console.log(error)
      });
  }

}

