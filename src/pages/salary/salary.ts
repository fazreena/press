import { EaPage } from './../ps/ea/ea';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PaymentSlipPage } from '../ps/payment-slip/payment-slip';
import { PaymentHistoryPage } from '../ps/payment-history/payment-history';
// import { OtherPage } from './other-page';

/**
 * Generated class for the SalaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-salary',
  templateUrl: 'salary.html',
})
export class SalaryPage {

  constructor(public navCtrl: NavController,
  public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalaryPage');
  }
  public viewEa() {
    this.navCtrl.push(EaPage);
  }
  public viewPaymentSlip() {
    this.navCtrl.push(PaymentSlipPage);
  }
  public viewPaymentHistory() {
    this.navCtrl.push(PaymentHistoryPage);
  }
}