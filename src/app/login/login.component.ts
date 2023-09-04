import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../_services/data.service';
import { HttpServiceService } from '../_services/http-service.service';
import { LocalStorage } from '../_services/localstore.service';
import { SnackBarService } from '../_services/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: UntypedFormGroup;
  public emailPattern = "[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$";
  constructor(private dataservice: DataService, private formBuilder: UntypedFormBuilder, private httpService: HttpServiceService, private snackBService: SnackBarService, private router: Router, private localService: LocalStorage) {
  }

  ngOnInit(): void {
    this.localService.clear()
    this.onBuildForm();
  }


  onBuildForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  login() {
    if (this.loginForm.valid) {
      let post = this.loginForm.value;
      this.httpService.post('admin/login', post)
        .subscribe(result => {
          if (result.status == 200) {
            const userDetails = result.data.user;
            const token = result.data.token;
            this.localService.store('userDetails',userDetails)
            this.localService.store('token',token)
            this.router.navigate(['dashboard'])
          } else {
            this.snackBService.openSnackBar(result.message, "Close");
          }
        });
    }
    else {
      this.validateAllFormFields(this.loginForm)
    }
  }

  validateAllFormFields(formGroup: UntypedFormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof UntypedFormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }
}
