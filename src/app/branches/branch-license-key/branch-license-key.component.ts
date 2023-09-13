import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';
import { DataService } from 'src/app/_services/data.service';
import { HttpServiceService } from 'src/app/_services/http-service.service';
import { SnackBarService } from 'src/app/_services/snack-bar.service';
import { Constants } from 'src/constants';

@Component({
  selector: 'app-branch-license-key',
  templateUrl: './branch-license-key.component.html',
  styleUrls: ['./branch-license-key.component.scss']
})
export class BranchLicenseKeyComponent {
  public Form!: UntypedFormGroup;
  branchkey: any ;
  branchId: any = this.route.snapshot.params['branch_id']
  tenantId: any = this.route.snapshot.params['tenant_id'];
  selectedBranchName: any = this.dataService.getData('branch_name')
  branchName: any = this.dataService.getData('branch_name')
  constructor(private dataService: DataService, private dialogService: ConfirmationDialogService, private snackBService: SnackBarService, private router: Router, private constants: Constants, private fb: UntypedFormBuilder, private httpService: HttpServiceService, private snackbService: SnackBarService, private route: ActivatedRoute) { }

  ngOnInit(): void {
   
    if (!this.dataService.getData('branch_name')) {
      this.router.navigate(['tenant'])
    }
    else {
      this.getBranchLicenseKey();
    }
  }
  getBranchLicenseKey() {
    this.httpService.get('admin/liscence-key/' + this.branchId)
      .subscribe(result => {
        if (result.status == 200) {
          this.branchkey = result.data.key.key;
        } else {
          this.snackBService.openSnackBar(result.message, "Close")
        }
      });
  }


}


