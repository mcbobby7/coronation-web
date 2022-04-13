import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../core/services/modal.service'
import { ChangeAddressComponent } from '../../modules/change-address/change-address.component'
import { ChangePasswordComponent } from '../../modules/change-password/change-password.component'
import { SignatureComponent } from '../../shared/components/signature/signature.component'
import { IdCardComponent } from '../../shared/components/id-card/id-card.component'
import { SubscribeComponent } from '../../shared/components/subscribe/subscribe.component'
import { SubscriptionServiceProxy } from '../http/services2'
import { PageRefreshService } from '../services/page-refresh.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  name = localStorage.getItem('fullname')
  pack = localStorage.getItem('tire')
  email = localStorage.getItem('email')
  refresh: boolean;

  panelOpenState = false;

  constructor(private modal: ModalService, private sub: SubscriptionServiceProxy, private dataSharingService: PageRefreshService) {

  }

  ngOnInit(): void {
    console.log(this.pack);
    this.checkTire()
    console.log("refresh");

  }
  checkTire() {
    console.log(this.email);

    this.sub.fetchUserSubscription().subscribe(res => {
      let id = res.result.subscriptionId.toString()
      this.pack = id
      localStorage.setItem('tire', id);
      console.log(id);
    },(resErr) => {

    });
  }
  changePassword() {
    this.modal.openModal(ChangePasswordComponent)
  }
  changeAddress() {
    this.modal.openModal(ChangeAddressComponent)
  }
  signature() {
    this.modal.openModal(SignatureComponent)
  }
  id() {
    this.modal.openModal(IdCardComponent)
  }
  subscribe() {
    this.modal.openModal(SubscribeComponent)
  }


}
