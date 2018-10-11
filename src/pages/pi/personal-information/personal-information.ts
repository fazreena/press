
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AboutprofilePage } from '../aboutprofile/aboutprofile';

/**
 * Generated class for the PersonalInformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personal-information',
  templateUrl: 'personal-information.html',
})
export class PersonalInformationPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalInformationPage');
  }
  
  public viewAboutprofile() {
    this.navCtrl.push(AboutprofilePage);
  }

  public showReleaseNote() {

    const alert = this.alertCtrl.create({
      title: 'Coming Soon!',
      subTitle: 'This features will be available on the next release In Shaa Allah. Thank you for supporting Prasarana ICT Team!',
      buttons: ['OK']
    });
    alert.present();
  }

}
