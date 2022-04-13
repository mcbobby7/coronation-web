import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../core/services/modal.service'
import { ErrorPopupComponent } from '../error-popup/error-popup.component'
import { SubscriptionServiceProxy } from '../../../core/http/services2'
import { PageRefreshService } from '../../../core/services/page-refresh.service'
import { Router } from '@angular/router';
import { SidebarComponent } from '../../../core/sidebar/sidebar.component'

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {
  reference = '';
  title
  vissible: boolean = false
  mode = null
  tire = localStorage.getItem('tire')
  free: number = null
  basic: number = null
  premium: number = null

  free1: number = null
  basic1: number = null
  premium1: number = null
  id = null

  constructor(private router: Router, private modal : ModalService, private sub: SubscriptionServiceProxy, public dataSharingService: PageRefreshService) { }

  ngOnInit() {
    this.reference = `ref${Math.ceil(Math.random() * 10e13)}`;
    this.fetchSubs()
  }

  fetchSubs() {
    this.sub.fetchAllSubscriptions(null, 200, 1).subscribe(res => {
      let data = res.result
      for(let i = 0; i < data.length; i++){
        if(data[i].id == 1) {
          this.free = data[i].amount
          this.free1 = this.free * 100
        }else if(data[i].id == 2) {
          this.basic = data[i].amount
          this.basic1 = this.basic * 100
        }else if(data[i].id == 3) {
          this.premium = data[i].amount
          this.premium1 = this.premium * 100
        }
      }
    },(resErr) => {

    });
  }
  done() {
    this.vissible = false
    let free = document.getElementById("free")
    let basic = document.getElementById("basic")
    let premium = document.getElementById("premium")
    if(this.mode == "basic"){
      if(this.tire == '2') {
        const data = {message: "Error: you are already on BASIC subscription", success: false}
        this.modal.openModal(ErrorPopupComponent, 'modal', data)
      }else {
        basic.click()
        this.id = 2
      }
    }else if(this.mode == "free"){

    }else if(this.mode == "premium"){
      if(this.tire == '3') {
        const data = {message: "Error: you are already on PREMIUM subscription", success: false}
        this.modal.openModal(ErrorPopupComponent, 'modal', data)
      }else {
        premium.click()
        this.id = 3
      }
    }

  }
  close() {
    this.vissible = false
    console.log("close");

  }

  pay(mode) {
    if(mode == "free") {
      return false
    }else {
      if(this.free == null || this.premium == null || this.basic == null) {
        this.modal.closeModal()
        const data = {message: "Error: fetching subscription prices", success: false}
        this.modal.openModal(ErrorPopupComponent, 'modal', data,)
      }else {
        this.mode = mode
        this.vissible = true
        this.reference = `ref${Math.ceil(Math.random() * 10e13)}`;
      }
    }
  }

  paymentInit() {
    console.log('Payment initialized' + this.id, this.reference);
  }

  paymentDone(ref: any) {
    this.title = 'Payment successfull';
    this.sub.subscriptionPayment(this.id, this.reference).subscribe((res) => {
      console.log("payment done" + this.id, this.reference);

      console.log(res);
      let data: any = res.result
          if(!res.hasError) {
            const data = {message: "Payment Successfull", success: true}
            this.modal.openModal(ErrorPopupComponent, 'modal', data)
            localStorage.setItem('tire', this.id)
            window.location.reload();
          }
          else {
            const data = {message: res.message, success: false}
            this.modal.openModal(ErrorPopupComponent, 'modal', data)
          }
        },
        (resErr) => {
          const data = {message: resErr, success: false}
          this.modal.openModal(ErrorPopupComponent, 'modal', data,)
        }
      );
  }

  paymentCancel() {
    console.log('payment failed');
  }

}
