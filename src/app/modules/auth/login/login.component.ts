import { Component, OnInit } from '@angular/core';
import { AccountServiceProxy, DropdownServiceProxy } from '../../../core/http/services2'
import { ModalService } from '../../../core/services/modal.service'
import { ErrorPopupComponent } from "../../../shared/components/error-popup/error-popup.component"
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../core/http/user.service'
import { ChangePasswordComponent } from '../../change-password/change-password.component'
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false
  image = "assets/images/loginImg.png"
  type = "password"

  constructor(private active: ActivatedRoute, private userServ: UserService, private drop: DropdownServiceProxy, private account: AccountServiceProxy, private toastr: ToastrService, private modal: ModalService, private router: Router,) { }

  ngOnInit(): void {
  }

  form = new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });

  login() {
    this.loading = true
    console.log(this.form.value);
    this.account.getToken(this.form.value).subscribe((res) => {
      console.log(res);
      let data: any = res.result
      this.loading = false
          if(!res.hasError) {
            this.router.navigateByUrl('/dashboard');
            if(data.isFirstTimeLogin) {
              this.modal.openModal(ChangePasswordComponent)
            }else {
            }
            this.toastr.success(res.message, 'Successfull');
            localStorage.setItem('token', data.jwt_token);
            localStorage.setItem('id', data.user_id);
            localStorage.setItem('companyId', data.company_id);
            localStorage.setItem('fullname', data.full_name);
            localStorage.setItem('tire', data.subMode);
            localStorage.setItem('email', data.email);
            localStorage.setItem('isLoggedIn', 'true');
            // this.user.setLogedin(true);
            // if(!data.mobile_enabled || !data.is_activated) {
            //   this.userServ.setUser(data)
            //   this.router.navigateByUrl('/?uuid=login-failed&token=ghsgshjashvkjsahasvkjkasjkjsakjvkasjkasjvkjhsvkasaksjkas');
            // }else {
            // }
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
