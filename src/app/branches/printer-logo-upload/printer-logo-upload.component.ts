import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/_services/data.service';
import { HttpServiceService } from 'src/app/_services/http-service.service';
import { SnackBarService } from 'src/app/_services/snack-bar.service';
import { Constants } from 'src/constants';

@Component({
  selector: 'app-printer-logo-upload',
  templateUrl: './printer-logo-upload.component.html',
  styleUrls: ['./printer-logo-upload.component.scss']
})
export class PrinterLogoUploadComponent {

  public logoForm!: UntypedFormGroup;
  logoData: any = [];
  branchId: any = this.route.snapshot.params['branch_id'];
  tenantId: any = this.route.snapshot.params['tenant_id'];
  ImageBaseData: any | ArrayBuffer = null;
  imagePath:any=this.constants.imageBasePath+'/'
  constructor(private route: ActivatedRoute, public dialog: MatDialog, private router: Router, private constants: Constants, private dataService: DataService, private fb: UntypedFormBuilder, private httpService: HttpServiceService, private snackbService: SnackBarService) {
  }

  ngOnInit(): void {
    this.getprinterLogo();
    this.onBuildForm();
  }

  ngOnDestroy() {
  }

  reset() {
    this.logoForm.reset()
  }

  onBuildForm() {
    this.logoForm = this.fb.group({
      type: ['', Validators.compose([Validators.required])],
      file: ['', Validators.compose([Validators.required])]
    })
  }
  getprinterLogo() {
    this.httpService.get('admin/printer-logo/' + this.branchId)
      .subscribe(result => {
        if (result.status == 200) {
          this.logoData = result.data;
        } else {
          this.snackbService.openSnackBar(result.message, "Close")
        }
      });
  }
  save() {
    let body = this.logoForm.value;
    body.branch_id = this.branchId;
    body.file = this.ImageBaseData;
    if (this.logoForm.valid) {
      this.httpService.post('admin/printer-logo', body)
        .subscribe(result => {
          if (result.status == 200) {
            this.snackbService.openSnackBar(result.message, "Close");
            this.logoForm.reset();
            this.getprinterLogo();
          } else {
            this.snackbService.openSnackBar(result.message, "Close")
          }
        });
    }
    else {
      this.validateAllFormFields(this.logoForm)
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
  fileChangeEvent(event: any) {
    let me = this;
    let file = event.target.files[0];
    this.logoForm.patchValue({
      'file': file.name
    })
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      me.ImageBaseData = reader.result?.toString();
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

}
