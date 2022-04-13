import { Component, OnInit } from '@angular/core';
import { AccountServiceProxy, DropdownServiceProxy } from '../../core/http/services2'
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../../core/services/modal.service'
import { ErrorPopupComponent } from "../../shared/components/error-popup/error-popup.component"
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  loading = false
  image = "assets/images/loginImg.png"
  type1 = "password"
  type2 = "password"
  type3 = "password"

  constructor(private route: ActivatedRoute, private drop: DropdownServiceProxy, private account: AccountServiceProxy, private toastr: ToastrService, private modal: ModalService, private router: Router,) { }

  ngOnInit(): void {
  }
  form = new FormGroup({
    currentPassword: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    confirmPassword: new FormControl("", Validators.required),
  });

  changePassword() {
    this.loading = true
    console.log(this.form.value);
    this.account.changePassword(this.form.value).subscribe((res) => {
      console.log(res);
      let data: any = res.result
      this.loading = false
          if(res.result.isSuccessful) {
            this.toastr.success("password changed successfully", 'Successfull');
            this.modal.closeModal()
          }
          else {
            this.toastr.error(res.result.message, 'Error');
          }
        },
        (resErr) => {
          const data = {message: resErr, success: false}
          this.modal.openModal(ErrorPopupComponent, 'modal', data,)
          this.loading = false
        }
      );
  }

  toggle1(type) {
    this.type1 = type
  }
  toggle2(type) {
    this.type2 = type
  }
  toggle3(type) {
    this.type3 = type
  }

}
