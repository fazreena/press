import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentSlipPage } from './payment-slip';

@NgModule({
  declarations: [
    PaymentSlipPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentSlipPage),
  ],
})
export class PaymentSlipPageModule {}
