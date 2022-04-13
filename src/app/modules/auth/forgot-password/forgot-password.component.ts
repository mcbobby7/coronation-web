import { Component, OnInit } from '@angular/core';
import { AccountServiceProxy, DropdownServiceProxy } from '../../../core/http/services2'
import { ModalService } from '../../../core/services/modal.service'
import { ErrorPopupComponent } from "../../../shared/components/error-popup/error-popup.component"
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../core/http/user.service'
import { Location } from "@angular/common";


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  loading = false
  image = "assets/images/loginImg.png"
  type = "password"
  path = null
  mode = true

  constructor(private location: Location, private userServ: UserService, private drop: DropdownServiceProxy, private account: AccountServiceProxy, private toastr: ToastrService, private modal: ModalService, private router: Router,) { }

  ngOnInit(): void {
    this.path = this.location.path().split('/')
    if(!this.path[3]) {
      this.mode = true
    }else {
      this.mode = false
      this.confirmForm.patchValue({
        token:  this.path[4],
      })
      console.log(this.confirmForm.value);

    }
  }

  form = new FormGroup({
    email: new FormControl("", Validators.required),
  });

  confirmForm = new FormGroup({
    token:  new FormControl("", Validators.required),
    email:  new FormControl("", Validators.required),
    password:  new FormControl("", Validators.required),
    confirmPassword:  new FormControl("", Validators.required),
  });

  reset() {
    this.loading = true
    console.log(this.form.value);
    this.account.forgotPassword(this.form.value).subscribe((res) => {
      console.log(res);
      let data: any = res.result
      this.loading = false
          if(!res.hasError) {
            this.toastr.success(res.message, 'Successfull');
            const data = {message: "Check your email for reset link", success: true}
            this.modal.openModal(ErrorPopupComponent, 'modal', data,)
          }
          else {
            this.toastr.error(res.message, 'Error');
          }
        },
        (resErr) => {
          const data = {message: resErr, success: false}
          this.modal.openModal(ErrorPopupComponent, 'modal', data,)
          this.loading = false
        }
      );
  }

  confirm() {
    this.loading = true
    console.log(this.confirmForm.value);
    this.account.resetPassword(this.confirmForm.value).subscribe((res) => {
      console.log(res);
      let data: any = res.result
      this.loading = false
          if(!res.hasError) {
            this.toastr.success(res.message, 'Successfull');
            this.router.navigateByUrl('auth/login')
          }
          else {
            this.toastr.error(res.message, 'Error');
          }
        },
        (resErr) => {
          const data = {message: resErr, success: false}
          this.modal.openModal(ErrorPopupComponent, 'modal', data,)
          this.loading = false
        }
      );
  }

  toggle(type) {
    this.type = type
  }

}
