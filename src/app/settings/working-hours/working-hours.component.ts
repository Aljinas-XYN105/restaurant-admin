import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpServiceService } from 'src/app/_services/http-service.service';
import { SnackBarService } from 'src/app/_services/snack-bar.service';
import * as moment from 'moment';
import { Constants } from 'src/constants';
import { Router } from '@angular/router';
import { indexOf } from 'lodash';
declare var $: any;

@Component({
  selector: 'app-working-hours',
  templateUrl: './working-hours.component.html',
  styleUrls: ['./working-hours.component.scss']
})
export class WorkingHoursComponent {
  public Form!: UntypedFormGroup;
  countriesArray: any = [];
  // index: any = 0;
  hoursArray: any = [];
  constructor(private router: Router, private constants: Constants, private fb: UntypedFormBuilder, private httpService: HttpServiceService, private snackbService: SnackBarService) { }

  ngOnInit(): void {
    this.onBuildForm();
    this.getCountries();
    this.getCurrentWorkingHours();
  }

  createItem(dataObj: any): UntypedFormGroup {
    return this.fb.group(dataObj);
  }


  getCurrentWorkingHours() {
    this.httpService.get('working-hours')
      .subscribe(result => {
        if (result.status == 200) {
          this.deleteGroup(0);
          this.hoursArray = result.data;
          let items = []
          let i = 0;
          for (let obj of this.hoursArray) {
            let ObjData = {
              'country_id': obj.country_id,
              'details': obj.details
            }
            items.push(ObjData);
            this.addOneMore();
            let detailIndex = 0;
            for(let detail of obj.details){
              this.addDetailFormArray(i);
              detailIndex ++;
            }
            this.removeDetails(i,detailIndex)
            i++;
          }
          console.log(items);
          this.Form.patchValue({
            'working_hours' : items
          })
        } else {
          this.snackbService.openSnackBar(result.message, "")
        }
      });
  }

  onBuildForm() {
    this.Form = this.fb.group({
      working_hours: this.fb.array([this.addGroup()]),
    })
  }

  private addGroup(): FormGroup {
    return this.fb.group({
      country_id: ['', Validators.compose([Validators.required])],
      details: this.fb.array([this.addDetails()]),
    });
  }

  addDetails(): FormGroup {
    return this.fb.group({
      text: ['', Validators.compose([Validators.required])],
      details: ['', Validators.compose([Validators.required])],
    })
  }

  details(index: number): FormArray {
    return this.working_hours.at(index).get("details") as FormArray
  }

  get working_hours() {
    return this.Form.controls["working_hours"] as FormArray;
  }

  addOneMore(): void {
    this.working_hours.push(this.addGroup())
  }

  deleteGroup(index: any) {
    this.working_hours.removeAt(index)
  }

  addDetailFormArray(hoursIndex: number) {
    this.details(hoursIndex).push(this.addDetails());
  }

  removeDetails(hoursIndex: number, detailIndex: number) {
    this.details(hoursIndex).removeAt(detailIndex);
  }

  getCountries() {
    this.httpService.get('countries')
      .subscribe(result => {
        if (result.status == 200) {
          this.countriesArray = result.data;
        } else {
          this.snackbService.openSnackBar(result.message, "")
        }
      });
  }

  reset() {
    this.Form.reset()
  }

  submit() {
    if (this.Form.valid) {
      this.httpService.post('working-hours', this.Form.value)
        .subscribe(result => {
          if (result.status == 200) {
            this.snackbService.openSnackBar(result.message, "Close")
          } else {
            this.snackbService.openSnackBar(result.message, "Close")
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
