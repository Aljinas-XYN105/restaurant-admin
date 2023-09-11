import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/_services/data.service';
import { HttpServiceService } from 'src/app/_services/http-service.service';
import { LocalStorage } from 'src/app/_services/localstore.service';
import { SnackBarService } from 'src/app/_services/snack-bar.service';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent {
  public staffForm!: UntypedFormGroup;
  countriesArray: any = [];
  selectedCountry: any;
  cityArray: any = [];
  branchArray: any = [];
  staffRoleArray: any = [];
  errorMessages: any = []
  public emailPattern = "[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$";
  constructor(private dataService: DataService, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: { editData: any, operation: any, branch_id: any, tenant_id: any }, private httpService: HttpServiceService, private snackbService: SnackBarService, private localService: LocalStorage, public dialogRef: MatDialogRef<AddStaffComponent>) {
  }

  ngOnInit() {
    this.onBuildForm();
    this.getStaffRoles()
    if (this.data?.operation == 'edit') {
      this.setEditData()
    }
  }

  onBuildForm() {
    this.staffForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      contact_no: ['', Validators.compose([Validators.required, Validators.pattern('^([0-9]{6,13})$')])],
      role_id: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
    })
  }

  getStaffRoles() {
    this.httpService.get('role', false)
      .subscribe(result => {
        if (result.status == 200) {
          this.staffRoleArray = result.data.roles;
        } else {
          console.log("Error in staff role");
        }
      });
  }

  setEditData() {
    this.staffForm.patchValue({
      'name': this.data.editData.name,
      'email': this.data.editData.email,
      'contact_no': this.data.editData.contact_no,
      'role_id': this.data.editData.user?.role_id,
    })
  }

  close() {
    this.dialogRef.close()
  }

  submit() {
    let body = this.staffForm.value;
    body.branch_id = this.data.branch_id;
    body.tenant_id = this.data.tenant_id;
    if (this.staffForm.valid) {
      this.httpService.post('admin/staff', body)
        .subscribe(result => {
          if (result.status == 200) {
            this.snackbService.openSnackBar(result.message, "Close");
            this.dialogRef.close('done')
          } else {
            this.errorMessages = result.data;
            this.snackbService.openSnackBar(result.message, "Close")
          }
        });
    }
    else {
      this.validateAllFormFields(this.staffForm)
      this.snackbService.openSnackBar("Please fill all the fields", "Close")
    }
  }

  update() {
    let body = this.staffForm.value;
    body.branch_id = this.data.branch_id;
    body.tenant_id = this.data.tenant_id;
    if (this.staffForm.valid) {
      this.httpService.put('admin/staff/' + this.data.editData.id, body)
        .subscribe(result => {
          if (result.status == 200) {
            this.snackbService.openSnackBar(result.message, "Close");
            this.dialogRef.close('done')
          } else {
            this.errorMessages = result.data;
            this.snackbService.openSnackBar(result.message, "Close")
          }
        });
    }
    else {
      this.validateAllFormFields(this.staffForm)
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
