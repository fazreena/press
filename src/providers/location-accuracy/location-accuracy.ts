import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';


@Injectable()
export class LocationAccuracyProvider {

  constructor(
    private locationAccuracy: LocationAccuracy,
    private platform: Platform,
  ) {
    console.log('Hello LocationAccuracyProvider Provider');
    
  }

  public enableGPS() {
    if (this.platform.is('cordova')) {
      this.locationAccuracy.canRequest().then((canRequest: boolean) => {

        if (canRequest) {
          // the accuracy option will be ignored by iOS
          this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
            .then(() => console.log('Request successful'),
            error => console.log('Error requesting location permissions', error)
            );
        }

      });
    } 
  }
}
