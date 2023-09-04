import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { DataService } from 'src/app/_services/data.service';
import { HttpServiceService } from 'src/app/_services/http-service.service';
import { LocalStorage } from 'src/app/_services/localstore.service';
import { SnackBarService } from 'src/app/_services/snack-bar.service';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.scss']
})
export class AddBranchComponent {
  public branchForm!: UntypedFormGroup;
  countriesArray: any = [];
  selectedCountry: any;
  cityArray: any = [];
  tenantArray: any = [];
  currencyArray: any = []
  public emailPattern = "[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$";
  constructor(private dataService: DataService, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: { editData: any, operation: any }, private httpService: HttpServiceService, private snackbService: SnackBarService, private localService: LocalStorage, public dialogRef: MatDialogRef<AddBranchComponent>) {
  }

  ngOnInit() {
    this.onBuildForm();
    this.getCountries();
    this.getCity();
    this.getTenant();
    this.getCurrency()
    if (this.data?.operation == 'edit') {
      this.setEditData()
    }
  }

  onBuildForm() {
    this.branchForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      tenant_id: ['', Validators.compose([Validators.required])],
      country_id: ['', Validators.compose([Validators.required])],
      contact_number: ['', Validators.compose([Validators.required, Validators.pattern('^([0-9]{6,13})$')])],
      currency_id: ['', Validators.compose([Validators.required])],
      user_name: ['', Validators.compose([Validators.required])],
      user_email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
      user_password: ['', Validators.compose([Validators.required])],
      city_id: ['', Validators.compose([Validators.required])],
      user_contact_no: ['', Validators.compose([Validators.required, Validators.pattern('^([0-9]{6,13})$')])],
    })
  }

  setEditData() {
    this.branchForm.patchValue({
      'name': this.data.editData.name,
      'country_id': this.data.editData.country_id,
      'city_id': this.data.editData.city,
      'currency_id': this.data.editData.currency_id,
      'contact_number': this.data.editData.contact_no,
      'city': this.data.editData.city_id,
      'tenant_id': this.data.editData.tenant_id
    })
    this.selectedCountry = this.data.editData.country_id;
  }

  close() {
    this.dialogRef.close()
  }

  getCountries() {
    this.httpService.get('country', false)
      .subscribe(result => {
        if (result.status == 200) {
          this.countriesArray = result.data.countries;
        } else {
          this.snackbService.openSnackBar(result.message, "")
        }
      });
  }

  getCity() {
    this.httpService.get('city', false)
      .subscribe(result => {
        if (result.status == 200) {
          this.cityArray = result.data.cities;
        } else {
          this.snackbService.openSnackBar(result.message, "")
        }
      });
  }

  getTenant() {
    this.httpService.get('admin/tenant', false)
      .subscribe(result => {
        if (result.status == 200) {
          this.tenantArray = result.data;
        } else {
          this.snackbService.openSnackBar(result.message, "")
        }
      });
  }

  getCurrency() {
    this.httpService.get('currency', false)
      .subscribe(result => {
        if (result.status == 200) {
          this.currencyArray = result.data.currencies;
        } else {
          this.snackbService.openSnackBar(result.message, "")
        }
      });
  }

  submit() {
    let body = this.branchForm.value;
    if (this.branchForm.valid) {
      this.httpService.post('admin/branch', body)
        .subscribe(result => {
          if (result.status == 200) {
            this.snackbService.openSnackBar(result.message, "Close");
            this.dialogRef.close('done')
          } else {
            this.snackbService.openSnackBar(result.message, "Close")
          }
        });
    }
    else {
      this.validateAllFormFields(this.branchForm)
      this.snackbService.openSnackBar("Please fill all the fields", "Close")
    }
  }

  update() {
    let body = this.branchForm.value;
    console.log(body);

    // if (this.branchForm.valid) {
    //   this.httpService.put('branch/' + this.data.editData.id, body)
    //     .subscribe(result => {
    //       if (result.status == 200) {
    //         this.snackbService.openSnackBar(result.message, "Close");
    //         this.dialogRef.close('done')
    //       } else {
    //         this.snackbService.openSnackBar(result.message, "Close")
    //       }
    //     });
    // }
    // else {
    //   this.validateAllFormFields(this.branchForm)
    //   this.snackbService.openSnackBar("Please fill all the fields", "Close")
    // }
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
