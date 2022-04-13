import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../core/services/modal.service'
import { ChangePasswordComponent } from '../change-password/change-password.component'
import { ChangeAddressComponent } from '../change-address/change-address.component'
import { SignatureComponent } from '../../shared/components/signature/signature.component'
import { IdCardComponent } from '../../shared/components/id-card/id-card.component'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private modal: ModalService) { }

  ngOnInit(): void {
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
}
