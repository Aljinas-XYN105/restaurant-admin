import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { DataService } from 'src/app/_services/data.service';
import { HttpServiceService } from 'src/app/_services/http-service.service';
import { LocalStorage } from 'src/app/_services/localstore.service';
import { SnackBarService } from 'src/app/_services/snack-bar.service';

@Component({
  selector: 'app-add-tenant',
  templateUrl: './add-tenant.component.html',
  styleUrls: ['./add-tenant.component.scss']
})
export class AddTenantComponent {
  public tenantForm!: UntypedFormGroup;
  countriesArray: any = [];
  selectedCountry: any;
  public emailPattern = "[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$";
  constructor(private dataService: DataService, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: { editData: any, operation: any }, private httpService: HttpServiceService, private snackbService: SnackBarService, private localService: LocalStorage, public dialogRef: MatDialogRef<AddTenantComponent>) {
  }

  ngOnInit() {
    this.onBuildForm();
    this.getCountries()
    if (this.data?.operation == 'edit') {
      this.setEditData()
    }
  }

  onBuildForm() {
    this.tenantForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      country_id: ['', Validators.compose([Validators.required])],
      contact_no: ['', Validators.compose([Validators.required, Validators.pattern('^([0-9]{6,13})$')])],
      website: ['', Validators.compose([Validators.required])],
      timezone: ['', Validators.compose([Validators.required])],
    })
  }

  setEditData() {
    this.tenantForm.patchValue({
      'name': this.data.editData.name,
      'country_id' : this.data.editData.country.id,
      'contact_no' : this.data.editData.contact_no,
      'website' : this.data.editData.website,
      'timezone' : this.data.editData.timezone
    })
    this.selectedCountry = this.data.editData.country.id
  }

  close() {
    this.dialogRef.close()
  }

  getCountries() {
    this.httpService.get('country')
      .subscribe(result => {
        if (result.status == 200) {
          this.countriesArray = result.data.countries;
        } else {
          this.snackbService.openSnackBar(result.message, "")
        }
      });
  }

  submit() {
    let body = this.tenantForm.value;
    // if (this.tenantForm.valid) {
      this.httpService.post('admin/tenant', body)
        .subscribe(result => {
          if (result.status == 200) {
            this.snackbService.openSnackBar(result.message, "Close");
            this.dialogRef.close('done')
          } else {
            this.snackbService.openSnackBar(result.message, "Close")
          }
        });
    // }
    // else {
    //   this.validateAllFormFields(this.tenantForm)
    //   this.snackbService.openSnackBar("Please fill all the fields", "Close")
    // }
  }

  update() {
    let body = this.tenantForm.value;
    if (this.tenantForm.valid) {
      this.httpService.put('admin/tenant/' + this.data.editData.id, body)
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
      this.validateAllFormFields(this.tenantForm)
      this.snackbService.openSnackBar("Please fill all the fields", "Close")
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
