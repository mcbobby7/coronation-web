import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountServiceProxy, DropdownServiceProxy } from '../../../core/http/services2'
import { ModalService } from '../../../core/services/modal.service'
import { ErrorPopupComponent } from "../../../shared/components/error-popup/error-popup.component"
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignaturePad } from 'angular2-signaturepad';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  loading = false
  image = "assets/images/loginImg.png"
  type = "password"
  holder: any= []
  loadingOtp = false
  stage = "phone"
  stageLoading = true
  path: any = null
  token: string = null
  user: any  = {}
  bank: any = {}
  phone = null
  otpTrue = false
  otp: any = null
  title = "Verify Mobile Number"
  sub = "OTP will be sent to this number"
  bankInfo: string = null
  idInfo: any = [

  ]
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


  constructor(private drop: DropdownServiceProxy, private account: AccountServiceProxy, private toastr: ToastrService, private modal: ModalService, private router: Router,) { }

  form = new FormGroup({
    id: new FormControl(0, Validators.required),
    isOnboarding: new FormControl(true, Validators.required),
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
    this.getHolderTypes()
  }

  getHolderTypes() {
    this.drop.values(1).subscribe(res => {
      this.holder = res.result
      console.log(res);
    });
  }


  spin() {
    this.loading = true
  }
  toggle(type) {
    this.type = type
  }

  onSubmit(e) {
    this.loading = true
    let info = this.user
    let bank = this.bank
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
            this.router.navigateByUrl('auth/login')
            const data = {message: "Please check your email for your username and password", success: true}
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
  drawComplete() {
    console.log(this.signaturePad.toDataURL());
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    this.user.validId = this.signatureImg
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
                  this.user.signature = this.cardImageBase64
                  console.log(this.user);

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
