import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { AccountServiceProxy, DropdownServiceProxy } from '../../core/http/services2'
import { ModalService } from '../../core/services/modal.service'
import { ErrorPopupComponent } from "../../shared/components/error-popup/error-popup.component"
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignaturePad } from 'angular2-signaturepad';
import { UserService } from '../../core/http/user.service'



@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {

  loading = false
  done = false
  loadingOtp = false
  image = "assets/images/loginImg.png"
  type = "password"
  stage = "phone"
  stageLoading = true
  path: any = null
  token: string = null
  uuid: string = null
  user: any ;
  phone = null
  otpTrue = false
  otp: any = null
  title = "Verify Mobile Number"
  sub = "OTP will be sent to this number"
  bankInfo: string = null
  idInfo: any = [

  ]
  holder: any = []
  signatureImg: string;
  box: boolean = false;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  signatureImage

  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  signaturePadOptions: Object = {
    'minWidth': 2,
    'canvasWidth': 700,
    'canvasHeight': 300
  };

  constructor(private active: ActivatedRoute, private userServ: UserService, private drop: DropdownServiceProxy, private toastr: ToastrService, private modal: ModalService, private router: Router, private location: Location,  private route: ActivatedRoute, private account: AccountServiceProxy) { }


  form = new FormGroup({
    id: new FormControl(0, Validators.required),
    isOnboarding: new FormControl(false, Validators.required),
    lastName: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    otherName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    holder_type: new FormControl('', Validators.required),
    mobileNo: new FormControl('', Validators.required),
    alternateMobileNo: new FormControl('', Validators.required),
    bankInfos: new FormControl('', Validators.required),
    identityInfos: new FormControl('', Validators.required),
    bvn: new FormControl('', Validators.required),
    nin: new FormControl('', Validators.required),
    tin: new FormControl('', Validators.required),
    rC_NO: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.active.queryParams
      .subscribe(params => {
        console.log(params);
        this.token = this.encodeURIComponent(params.token);
        this.uuid = params.uuid
        console.log(this.token, this.uuid);
      }
    );
    setTimeout(()=>{
      this.signaturePad.set('minWidth', 2);
      this.signaturePad.clear();
    }, 0);
    this.getHolderTypes()

    if(this.uuid == "login-failed") {
      this.user = this.userServ.userInfo
      if(this.userServ.userInfo == null) {
        this.router.navigateByUrl('auth/login')
      }
      this.form.patchValue({
        id: this.user.user_id,
        lastName: this.user.last_name,
        firstName: this.user.first_name,
        otherName: this.user.other_name,
        email: this.user.email,
        holder_type: this.user.holder_type,
        mobileNo: this.user.phone_number,
        alternateMobileNo: this.user.phone_number,
        bankInfos: this.bankInfo,
        identityInfos: this.idInfo,
        bvn: this.user.bvn,
        nin: this.user.nin,
        tin: this.user.tin,
        rC_NO: this.user.rc_number,
      })
      if(this.user.mobile_enabled){
        this.stage = "form"
      }else {
        this.stage = "phone"
      }
    }else if(this.uuid == null) {
      this.router.navigateByUrl('auth/login')
    }else if(this.uuid == "reset-password") {
      this.router.navigateByUrl(`/auth/forgot-password/ytdykt/${this.token}`)
    }
    else {
      this.verifyEmail()
    }
  }

  getHolderTypes() {
    this.drop.values(1).subscribe(res => {
      this.stageLoading = false
      this.holder = res.result
      console.log(res);
    });
  }
  verifyEmail() {
    this.account.verifyEmail(this.token).subscribe(res => {
      this.stageLoading = false
      this.user = res.result
      console.log(this.user);
      this.idInfo = JSON.stringify(this.user.identity_info)
      this.bankInfo = JSON.stringify(this.user.account_details)
      if(!res.hasError) {
        this.done = true
        this.user = res.result
        this.phone = this.user.phone_number
        localStorage.setItem('token', this.user.jwt_token);
        this.form.patchValue({
          id: this.user.user_id,
          lastName: this.user.last_name,
          firstName: this.user.first_name,
          otherName: this.user.other_name,
          email: this.user.email,
          holder_type: this.user.holder_type,
          mobileNo: this.user.phone_number,
          alternateMobileNo: this.user.phone_number,
          bankInfos: this.bankInfo,
          identityInfos: this.idInfo,
          bvn: this.user.bvn,
          nin: this.user.nin,
          tin: this.user.tin,
          rC_NO: this.user.rc_number,
        })
        if(this.user.email_confirmed) {
          const data = {message: "Email verified successfully", success: true}
          this.modal.openModal(ErrorPopupComponent, 'modal', data)
          if(this.user.mobile_enabled){
            this.stage = "form"
          }else {
            this.stage = "phone"
          }
        }else {
          const data = {message: "Error: please refresh browser to try again", success: false}
          this.modal.openModal(ErrorPopupComponent, 'modal', data)
        }
      } else {
        console.log("error");
        const data = {message: res.message, success: false}
        this.modal.openModal(ErrorPopupComponent, 'modal', data)
      }
    },(resErr) => {
        const data = {message: resErr, success: false}
        this.modal.openModal(ErrorPopupComponent, 'modal', data,)
        console.log(resErr);
        this.stageLoading = false
    });
  }
  spin() {
    this.loading = true
  }
  toggle(type) {
    this.type = type
  }
  encodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
        return '%' + c.charCodeAt(0).toString(16);
    });
}

  sendOTP() {
    this.loadingOtp = true
    this.form.patchValue({
      mobileNo: this.user.phone_number,
      alternateMobileNo: this.user.phone_number,
    })
    this.account.verifyPhoneNumber(this.user.phone_number).subscribe((res) => {
      console.log(res);
      this.loadingOtp = false
          if(!res.hasError) {
            this.toastr.success("OTP sent to mobile number", 'Successfull');
            this.otpTrue = true
            this.title = "Verify OTP"
            this.sub = "enter OTP sent to your mobile number"
          }
          else {
            this.toastr.error(res.message, 'Error');
          }
        },
        (resErr) => {
          const data = {message: resErr, success: false}
          this.modal.openModal(ErrorPopupComponent, 'modal', data,)
          this.loadingOtp = false
        }
      );
  }
  resend() {
    this.otpTrue = false
  }
  verifyOTP() {
    this.loading = true
    console.log(this.user.phone_number, this.otp);

    this.account.enableUserMobile(this.user.phone_number, this.otp).subscribe((res) => {
      this.loading = false
          if(!res.hasError) {
            this.toastr.success("OTP verified", 'Successfull');
            this.stage = "form"
            // this.otpTrue = true
            // this.title = "Verify OTP"
            // this.sub = "enter OTP sent to your mobile number"
          }
          else {
            this.toastr.error("Sorry the OTP you passed is wrong", 'Error');
          }
        },
        (resErr) => {
          const data = {message: resErr, success: false}
          this.modal.openModal(ErrorPopupComponent, 'modal', data,)
          this.loading = false
        }
      );
  }


  onSubmit(e) {
    this.loading = true
    let info = this.user.identity_info
    let bank = this.user.account_details
    this.idInfo = JSON.stringify([{...info}])
    this.bankInfo = JSON.stringify([{...bank}])
    console.log(info);
    console.log(this.idInfo);

    this.form.patchValue({
      identityInfos: this.idInfo,
      bankInfos: this.bankInfo
    })
    console.log(this.form.value);
    this.account.activation(this.form.value).subscribe((res) => {
      this.loading = false
          if(!res.hasError) {
            this.toastr.success(res.message, 'Successfull');
            this.stage = "form"
            this.router.navigateByUrl('auth/login')
            // this.otpTrue = true
            // this.title = "Verify OTP"
            // this.sub = "enter OTP sent to your mobile number"
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
  drawComplete() {
    console.log(this.signaturePad.toDataURL());
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    this.user.identity_info.validId = this.signatureImg
  }

  drawStart() {
    console.log('begin drawing');
  }

  clearSignature() {
    this.signaturePad.clear();
  }

  boxup() {
    this.box = !this.box
    console.log(this.user.identity_info);

  }
  showImage1(data) {
    this.signatureImage = data;

}
public fileLeave(event){
  console.log(event);
}


fileChangeEvent(fileInput: any) {
  this.imageError = null;
  console.log(fileInput.target.files[0]);

  if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
          this.imageError =
              'Maximum size allowed is ' + max_size / 1000 + 'Mb';
          return false;
      }

      // if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        if(fileInput.target.files[0].type == "image/png" || fileInput.target.files[0].type == "image/jpeg") {

        }else {
          this.imageError = 'Only Images are allowed ( JPG | PNG )';
          return false;
        }
      // }
      const reader = new FileReader();
      reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;
          image.onload = rs => {
              const img_height = rs.currentTarget['height'];
              const img_width = rs.currentTarget['width'];

              console.log(img_height, img_width);


              if (img_height > max_height && img_width > max_width) {
                  this.imageError =
                      'Maximum dimentions allowed ' +
                      max_height +
                      '*' +
                      max_width +
                      'px';
                  return false;
              } else {
                  const imgBase64Path = e.target.result;
                  this.cardImageBase64 = imgBase64Path;
                  this.isImageSaved = true;
                  this.user.identity_info.signature = this.cardImageBase64
                //   this.form.patchValue({
                //     logo: this.cardImageBase64
                // });
              }
          };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
  }
}

}
