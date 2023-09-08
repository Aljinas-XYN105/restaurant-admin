import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormGroup, FormArray, UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/_services/data.service';
import { HttpServiceService } from 'src/app/_services/http-service.service';
import { SnackBarService } from 'src/app/_services/snack-bar.service';
import { Constants } from 'src/constants';

@Component({
  selector: 'app-assign-staff',
  templateUrl: './assign-staff.component.html',
  styleUrls: ['./assign-staff.component.scss']
})
export class AssignStaffComponent {

  public staffForm!: UntypedFormGroup;
  customerData: any = [];
  editData: any;
  public numericExpression = "^[+]?[0-9]\\d*(\\.\\d{1,2})?$";
  public emailPattern = "[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$";
  branchId: any = this.route.snapshot.params['branch_id'];
  tenantId: any = this.route.snapshot.params['tenant_id'];
  branchName: any = this.dataService.getData('branch_name')
  constructor(private route: ActivatedRoute, public dialog: MatDialog, private router: Router, private constants: Constants, private dataService: DataService, private fb: UntypedFormBuilder, private httpService: HttpServiceService, private snackbService: SnackBarService) {
  }

  ngOnInit(): void {
    if (!this.dataService.getData('branch_name')) {
      this.router.navigate(['tenant'])
    }
    else {
    this.getCustomerSupportData();
    this.onBuildForm();
    }
  }

  ngOnDestroy() {
  }

  reset() {
    this.staffForm.reset()
  }

  onBuildForm() {
    this.staffForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      contact_no: ['', Validators.compose([Validators.required,Validators.pattern(this.numericExpression)])],
      email: ['', Validators.compose([Validators.required,Validators.pattern(this.emailPattern)])],
      whatsapp_no: ['', Validators.compose([Validators.pattern(this.numericExpression)])],
      address: [''],
    })
  }
  getCustomerSupportData() {
    this.httpService.get('admin/customer-support/' + this.branchId)
      .subscribe(result => {
        if (result.status == 200) {
          this.customerData = result.data;
          if (this.customerData) {
            this.staffForm.patchValue({
              name:this.customerData.name,
              contact_no: this.customerData.contact_no,
              email:this.customerData.email ,
              whatsapp_no:this.customerData.whatsapp_no ,
              address: this.customerData.address,
            })
          }
        } else {
          this.snackbService.openSnackBar(result.message, "Close")
        }
      });
  }
  save() {
    let body = this.staffForm.value;
    body.branch_id = this.branchId;
    if (this.staffForm.valid) {
      this.httpService.post('admin/customer-support', body)
        .subscribe(result => {
          if (result.status == 200) {
            this.snackbService.openSnackBar(result.message, "Close");

          } else {
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
