import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FileUploadService} from '../../../../_services/file.upload.service';
import {User} from '../../../../_models/user';
import {UserService} from '../../../../_services/user.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Upload} from '../../../../_models/upload';

@Component({
  templateUrl: 'add.karyawan.component.html',
  styleUrls: ['add.karyawan.component.css', '../../../../app.component.css']
})
export class AddKaryawanComponent {

  imagePath: File = null;
  imgURL: any;
  public message: string;
  private saveOrEdit: boolean;
  isValidFormSubmitted = false;
  showFirstTime = true;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  private user: User;
  private upload: Upload;
  private listRole;

  //if saveOredit = true == save
  constructor(private formBuilder: FormBuilder,
              private userSevice: UserService,
              private fileUploadService: FileUploadService) {
    this.saveOrEdit = true;

    this.listRole = userSevice.findRole();


    this.user = new User;
    if (localStorage.getItem('empId') != null) {
      this.saveOrEdit = false;
      userSevice.getById(JSON.parse(localStorage.getItem('empId'))).subscribe(
        result => {
          this.user = result;
        });
    }

    if (this.user.fileName != undefined && this.user.fileName != '') {
      this.fileUploadService.getFile(this.user.fileName).subscribe(
        result => {
           this.imgURL = new FileReader();
           this.imgURL = result.urlFile;
        }
      );
    }
  }

  preview(files) {
    if (files.length === 0) {
      return;
    }

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      this.imgURL = new FileReader();
      return;
    }

    var reader = new FileReader();
    this.imagePath = files[0];
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  save(form: NgForm) {
    this.showFirstTime = false;
    this.isValidFormSubmitted = false;
    if (form.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    this.user = form.value;
    // this.imagePath = ''; //bawa nanti pathnya
    // this.userService.createUser(this.user);

  }

  testUpload() {
    this.fileUploadService.pushFileToStorage(this.imagePath).subscribe(
      result => {
        console.log(result);
        this.upload = result;
        console.log('masuk');
        console.log('a' + this.upload);
      }, error => {

      }, () => {
        console.log('asu ' + this.upload.fileName);
      }
    );
  }

}
