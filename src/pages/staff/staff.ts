import { EducationPage } from './../pi/education/education';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PunchPage } from '../tms/punch/punch';
import { FamilyPage } from '../pi/family/family';
import { PersonalInformationPage } from '../pi/personal-information/personal-information';

/**
 * Generated class for the StaffPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-staff',
  templateUrl: 'staff.html',
})
export class StaffPage {

  constructor(
  public navCtrl: NavController,
  public navParams: NavParams,) {
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad StaffPage');
  }

  public viewPersonalInformation() {
    this.navCtrl.push(PersonalInformationPage);
  }
  public viewFamily() {
    this.navCtrl.push(FamilyPage);
  }
  public viewEducation() {
      this.navCtrl.push(EducationPage);
  }

}
