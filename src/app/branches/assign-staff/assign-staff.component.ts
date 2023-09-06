import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormGroup, FormArray, UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
  countriesArray: any = [];
  editData: any;
  public numericExpression = "^[+]?[0-9]\\d*(\\.\\d{1,2})?$"
  constructor(public dialog: MatDialog, private router: Router, private constants: Constants, private dataService: DataService, private fb: UntypedFormBuilder, private httpService: HttpServiceService, private snackbService: SnackBarService) {
  }

  ngOnInit(): void {
    this.onBuildForm();
  }

  ngOnDestroy() {
  }

  reset() {
    this.staffForm.reset()
  }

  onBuildForm() {
    this.staffForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      phone_number: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      address: [''],
    })
  }

  save() {

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
