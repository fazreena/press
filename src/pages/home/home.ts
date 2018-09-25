import { Component } from '@angular/core';
import { NavController, AlertController, Events } from 'ionic-angular';
import { DataApiProvider } from '../../providers/data-api/data-api';
import { PunchPage } from '../tms/punch/punch';
import { PersonalInformationPage } from '../pi/personal-information/personal-information';
import { PaymentSlipPage } from '../ps/payment-slip/payment-slip';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  slides = [
    {
      title: "Time Attendance",
      description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.",
      image: "assets/imgs/tms.png",
      page: 'PunchPage'
    },
    {
      title: "Personal Information",
      description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
      image: "assets/imgs/personal-info.png",
      page: 'PersonalInformationPage'
    },
    {
      title: "Payment Slips",
      description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
      image: "assets/imgs/payslip.png",
      page: 'PaymentSlipPage'
    },
    // {
    //   title: "Leave Management",
    //   description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
    //   image: "assets/img/ica-slidebox-img-3.png",
    //   page: 'LeaveManagementPage'
    // },
    // {
    //   title: "Claims Management",
    //   description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
    //   image: "assets/img/ica-slidebox-img-3.png",
    //   page: 'ClaimManagementPage'
    // }
  ];

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public dataApi: DataApiProvider, 
    public events: Events
  ) {
    this.choose_module('home');
  } 

  public gotoPage(page: string) {
    if (page == 'PunchPage'){ 
      this.choose_module('tms');
      this.navCtrl.setRoot(PunchPage)
    } else if (page == 'PersonalInformationPage') {
      this.choose_module('pi');
      this.navCtrl.setRoot(PersonalInformationPage)
    } else if (page == 'PaymentSlipPage') {
      this.choose_module('ps');
      this.navCtrl.setRoot(PaymentSlipPage)
    } else
      this.showAlert('Not available yet!', 'This module will be in future implementation. Insya Allah.')

  }

  choose_module(module) {
    console.log('Menu choosed: ' + module)
    this.events.publish('menu:choosen', module);
  }

  showAlert(title: string, subTitle: string) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }
}
