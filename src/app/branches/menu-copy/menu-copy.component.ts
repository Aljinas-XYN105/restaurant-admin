import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormGroup, Validators, FormArray, UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';
import { DataService } from 'src/app/_services/data.service';
import { HttpServiceService } from 'src/app/_services/http-service.service';
import { SnackBarService } from 'src/app/_services/snack-bar.service';
import { Constants } from 'src/constants';

@Component({
  selector: 'app-menu-copy',
  templateUrl: './menu-copy.component.html',
  styleUrls: ['./menu-copy.component.scss']
})
export class MenuCopyComponent {
  public Form!: UntypedFormGroup;
  branchArray: any = [];
  tenantArray: any = [];
  branchId: any = this.route.snapshot.params['branch_id'];
  tenantId: any = this.route.snapshot.params['tenant_id'];
  selectedBranchName: any = this.dataService.getData('branch_name')
  constructor(private dataService: DataService, private dialogService: ConfirmationDialogService, private snackBService: SnackBarService, private router: Router, private constants: Constants, private fb: UntypedFormBuilder, private httpService: HttpServiceService, private snackbService: SnackBarService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.onBuildForm();
    if (!this.dataService.getData('branch_name')) {
      this.router.navigate(['tenant'])
    }
    else {
      this.getTenant();
      this.getBranch();
    }
  }

  onBuildForm() {
    this.Form = this.fb.group({
      tenant_id: ['', Validators.required],
      from_branch_id: ['', Validators.required],
      to_branch_id: [this.branchId, Validators.required]
    })
  }

  getTenant() {
    this.httpService.get('admin/tenant')
      .subscribe(result => {
        if (result.status == 200) {
          this.tenantArray = result.data;
        } else {
          this.snackBService.openSnackBar(result.message, "Close")
        }
      });
  }

  tenantChange() {
    this.tenantId = this.Form.value['tenant_id'];
    this.Form.controls['from_branch_id'].setValue(null)
    this.getBranch()
  }

  getBranch() {
    this.httpService.get('admin/list-branch/' + this.tenantId)
      .subscribe(result => {
        if (result.status == 200) {
          this.branchArray = result.data;
        } else {
          this.snackBService.openSnackBar(result.message, "Close")
        }
      });
  }

  // reset() {
  //   this.Form.reset()
  // }

  submit() {
    if (this.Form.valid) {
      const options = {
        title: 'Copy Menu',
        message: 'Are you sure ?',
        cancelText: 'NO',
        confirmText: 'YES'
      };
      this.dialogService.open(options);
      this.dialogService.confirmed().subscribe(confirmed => {
        if (confirmed) {
          this.httpService.get('copy-full-menu/' + this.Form.value['from_branch_id'] + '/' + this.Form.value['to_branch_id'])
            .subscribe(result => {
              if (result.status == 200) {
                this.snackbService.openSnackBar(result.message, "Close")
              } else {
                this.snackbService.openSnackBar(result.message, "Close")
              }
            });
        }
      });
    }
    else {
      this.snackbService.openSnackBar("Please fill all required fileds", "Close");
      this.validateAllFormFields(this.Form)
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
