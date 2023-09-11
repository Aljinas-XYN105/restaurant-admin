import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/_services/data.service';
import { HttpServiceService } from 'src/app/_services/http-service.service';
import { LocalStorage } from 'src/app/_services/localstore.service';
import { SnackBarService } from 'src/app/_services/snack-bar.service';

@Component({
  selector: 'app-add-registration',
  templateUrl: './add-registration.component.html',
  styleUrls: ['./add-registration.component.scss']
})
export class AddRegistrationComponent {
  public branchForm!: UntypedFormGroup;
  countriesArray: any = [];
  selectedCountry: any;
  cityArray: any = [];
  tenantArray: any = [];
  currencyArray: any = []
  public emailPattern = "[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$";
  branchId: any = this.route.snapshot.params['branch_id'];
  tenantId:any=this.route.snapshot.params['tenanat_id'];
  constructor(private route: ActivatedRoute, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: { branch_id: any, tenant_id: any }, private httpService: HttpServiceService, private snackbService: SnackBarService, private localService: LocalStorage, public dialogRef: MatDialogRef<AddRegistrationComponent>) {
  }

  ngOnInit() {
    this.onBuildForm();
    // if (this.data?.operation == 'edit') {
    //   this.setEditData()
    // }
  }

  onBuildForm() {
    this.branchForm = this.fb.group({
      expiry_date: ['', Validators.compose([Validators.required])],
      notify_period: ['', Validators.compose([Validators.required])],
      grace_period: ['', Validators.compose([Validators.required])],
      amount: ['', Validators.compose([Validators.required])],
      registered_date: ['', Validators.compose([Validators.required])],
      
    })
  }
 

  setEditData() {
    // this.branchForm.patchValue({
    //   'name': this.data.editData.name,
    //   'country_id': this.data.editData.country_id,
    //   'city_id': this.data.editData.city,
    //   'currency_id': this.data.editData.currency_id,
    //   'contact_number': this.data.editData.contact_no,
    //   'city': this.data.editData.city_id,
    //   'tenant_id': this.data.editData.tenant_id
    // })
    // this.selectedCountry = this.data.editData.country_id;
  }

  close() {
    this.dialogRef.close()
  }

  submit() {
    let body = this.branchForm.value;
    
    body['branch_id']=this.data?.branch_id;
    body['tenant_id']=this.data?.tenant_id;
    if (this.branchForm.valid) {
      this.httpService.post('admin/tenant-subscription-add', body)
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

