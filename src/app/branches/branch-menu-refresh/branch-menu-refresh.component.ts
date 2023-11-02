import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';
import { DataService } from 'src/app/_services/data.service';
import { HttpServiceService } from 'src/app/_services/http-service.service';
import { SnackBarService } from 'src/app/_services/snack-bar.service';
import { Constants } from 'src/constants';

@Component({
  selector: 'app-branch-menu-refresh',
  templateUrl: './branch-menu-refresh.component.html',
  styleUrls: ['./branch-menu-refresh.component.scss']
})
export class BranchMenuRefreshComponent {
  public Form!: UntypedFormGroup;
  branchArray: any = [];
  branchId: any = this.route.snapshot.params['branch_id']
  tenantId: any = this.route.snapshot.params['tenant_id'];
  selectedBranchName: any = this.dataService.getData('branch_name')
  branchName: any = this.dataService.getData('branch_name')
  constructor(private dataService: DataService, private dialogService: ConfirmationDialogService, private snackBService: SnackBarService, private router: Router, private constants: Constants, private fb: UntypedFormBuilder, private httpService: HttpServiceService, private snackbService: SnackBarService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.onBuildForm();
    if (!this.dataService.getData('branch_name')) {
      this.router.navigate(['tenant'])
    }
    else {
      this.getBranch();
    }
  }

  onBuildForm() {
    this.Form = this.fb.group({
      from_branch_id: ['', Validators.required],
      to_branch_id: [this.branchId, Validators.required]
    })
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
        title: 'Branch Menu Refresh',
        message: 'Are you sure ?',
        cancelText: 'NO',
        confirmText: 'YES'
      };
      this.dialogService.open(options);
      this.dialogService.confirmed().subscribe(confirmed => {
        if (confirmed) {
          this.httpService.get('admin/branch-menu-refresh/' + this.Form.value['from_branch_id'] + '/' + this.Form.value['to_branch_id'])
            .subscribe(result => {
              if (result.status == 200) {
                this.snackbService.openSnackBar(result.data, "Close")
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
