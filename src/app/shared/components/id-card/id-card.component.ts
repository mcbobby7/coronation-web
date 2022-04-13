import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-id-card',
  templateUrl: './id-card.component.html',
  styleUrls: ['./id-card.component.scss']
})
export class IdCardComponent implements OnInit {
  signatureImage
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  loading: boolean = false
  deleteLoad: boolean = false
  data: any = []
  companyDetail

  constructor() { }

  ngOnInit(): void {
  }

  showImage1(data) {
    this.signatureImage = data;
  //   this.toastr.success("Signature Added", "")
  //   this.form.patchValue({
  //     signature: data
  // });
  // console.log(this.form.value);

}

  onSubmit(e) {
    // this.form.patchValue({
    //   logo: this.cardImageBase64
    // })
    e.preventDefault();
    // this.company.saveCompany(this.form.value).subscribe(data => {
    //   this.listenToLoading();
    //   this.data = data
    //   if(this.data.isSuccessful) {
    //     this.toastr.success("logo added Successfully", "Yoopee")
    //     this.modal.closeModal()
    //     this.form.reset()
    //   }else {

    //   }
    //   console.log(this.data);
    // });
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
                  //   this.form.patchValue({
                  //     logo: this.cardImageBase64
                  // });
                }
            };
        };

        reader.readAsDataURL(fileInput.target.files[0]);
    }
}

removeImage() {
  // this.form.patchValue({
  //   logo: ""
  // })
  this.deleteLoad = true
  // this.company.saveCompany().subscribe(data => {
  //   this.deleteLoad = false
  //   this.data = data
  //   if(this.data.isSuccessful) {

  //   }else {

  //   }
  //   console.log(this.data);
  // });
}

}
