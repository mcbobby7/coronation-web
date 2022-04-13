import { Component, OnInit } from '@angular/core';
import { AccountServiceProxy, DropdownServiceProxy, GeographyServiceProxy, CompanyServiceProxy, ServiceRequestServiceProxy } from '../../core/http/services2'
import { ModalService } from '../../core/services/modal.service'
import { ErrorPopupComponent } from "../../shared/components/error-popup/error-popup.component"
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-address',
  templateUrl: './change-address.component.html',
  styleUrls: ['./change-address.component.scss']
})
export class ChangeAddressComponent implements OnInit {

  loading = false
  image = "assets/images/loginImg.png"
  type1 = "password"
  type2 = "password"
  type3 = "password"
  countries: any = []
  companies: any = []
  save: boolean = true
  title = "Change addrres"
  sub = "fill details to change your address"
  otpNumber = null

  constructor(private service: ServiceRequestServiceProxy, private geo: GeographyServiceProxy, private comp: CompanyServiceProxy, private drop: DropdownServiceProxy, private account: AccountServiceProxy, private toastr: ToastrService, private modal: ModalService, private router: Router,) { }

  ngOnInit(): void {
    this.getCountries()
    this.getComp()
  }
  form = new FormGroup({
    id: new FormControl(0, Validators.required),
    company_id: new FormControl("", Validators.required),
    oldAddress: new FormControl("", Validators.required),
    new_Address: new FormControl("", Validators.required),
    country_id: new FormControl("", Validators.required),
    dob: new FormControl("", Validators.required),
  });

  getCountries() {
    this.geo.fetchCountries().subscribe(res => {
      this.countries = res.result
      console.log(res);
    });
  }
  getComp() {
    this.comp.getall(0, 0, 0).subscribe(res => {
      this.companies = res.result
      console.log(this.companies);
    });
  }

  sendOtp() {
    this.loading = true
    this.service.sendRequestToken().subscribe((res) => {
      this.loading = false
      console.log(res);
      let data: any = res.result
          if(!res.hasError) {
            this.toastr.success("OTP sent to mobile number and email", 'Successfull');
            this.title = "Verify OTP"
            this.sub = "enter OTP sent to mobile number or email address"
            this.switch()
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

  switch() {
    this.save = false
  }

  VerifyOTP() {
    this.loading = true
    this.service.validateRequestToken(this.otpNumber).subscribe((res) => {
      this.loading = false
      console.log(res);
      let data: any = res.result
          if(!res.hasError) {
            this.title = "Verify OTP"
            this.sub = "enter OTP sent to mobile number or email address"
            this.changeAddress()
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

  changeAddress() {
    this.loading = true
    this.form.patchValue({
      company_id: +this.form.value.company_id,
      country_id: +this.form.value.country_id,
    })
    console.log(this.form.value);
    this.service.changeOfAddress(this.form.value).subscribe((res) => {
      console.log(res);
      let data: any = res.result
      this.loading = false
          if(!res.hasError) {
            this.toastr.success("Address changed successfully", 'Successfull');
            this.modal.closeModal()
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

}
