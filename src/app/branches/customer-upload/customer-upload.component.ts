import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/_services/data.service';
import { HttpServiceService } from 'src/app/_services/http-service.service';
import { SnackBarService } from 'src/app/_services/snack-bar.service';
import { Constants } from 'src/constants';

@Component({
  selector: 'app-customer-upload',
  templateUrl: './customer-upload.component.html',
  styleUrls: ['./customer-upload.component.scss']
})
export class CustomerUploadComponent {

  public Form!: UntypedFormGroup;
  tenantId: any = this.route.snapshot.params['tenant_id'];
  branchId: any = this.route.snapshot.params['branch_id'];
  branchName: any = this.dataService.getData('branch_name');
  selectedFile: File | null = null;
  constructor(private route: ActivatedRoute, public dialog: MatDialog, private router: Router, private constants: Constants, private dataService: DataService, private fb: UntypedFormBuilder, private httpService: HttpServiceService, private snackbService: SnackBarService) {
  }

  ngOnInit(): void {
    if (!this.dataService.getData('branch_name')) {
      this.router.navigate(['tenant'])
    }
    else {
      this.onBuildForm();
    }
  }

  reset() {
    this.Form.reset()
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onBuildForm() {
    this.Form = this.fb.group({
      file: ['', Validators.compose([Validators.required])],
    })
  }

  save() {
    if (this.Form.valid) {
      this.httpService.post('admin/customer-support', this.Form.value)
        .subscribe(result => {
          if (result.status == 200) {
            this.snackbService.openSnackBar(result.message, "Close")
          } else {
            this.snackbService.openSnackBar(result.message, "Close")
          }
        });
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
