import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';
import { DataService } from 'src/app/_services/data.service';
import { HttpServiceService } from 'src/app/_services/http-service.service';
import { SnackBarService } from 'src/app/_services/snack-bar.service';
import { AddRegistrationComponent } from '../add-registration/add-registration.component';
import { FormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { SubscriptionHistoryComponent } from '../subscription-history/subscription-history.component';


export interface Data {
  id: string;
  Registered_date: any;
  Expiry_date: any;
  notice_period: any;
  grace_period: any;
  amount: any;
}

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss']
})
export class RegistrationsComponent {
  public subscriptionForm!: UntypedFormGroup;
  countriesArray: any = [];
  selectedCountry: any;
  cityArray: any = [];
  tenantArray: any = [];
  currencyArray: any = []
  public emailPattern = "[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$";
  branchId: any = this.route.snapshot.params['branch_id'];
  tenantId:any=this.route.snapshot.params['tenant_id'];
  displayedColumns: string[] = ['Registered_date', 'Expiry_date', 'notice_period', 'grace_period', 'amount','actions'];
  public dataSource = new MatTableDataSource<Data>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tenantName: any = this.dataService.getData('tenant_name')
   branchName:any;
  constructor( private snackbService: SnackBarService, private fb: FormBuilder,private dialogService: ConfirmationDialogService, private router: Router, private dataService: DataService, private snackBService: SnackBarService, private httpService: HttpServiceService, public dialog: MatDialog,private route:ActivatedRoute) {
    this.branchName = this.dataService.getData('branch_name')
  }

  ngOnInit(): void {
    this.onBuildForm();
    this.getData();
  }

  onBuildForm() {
    this.subscriptionForm = this.fb.group({
      expiry_date: ['', Validators.compose([Validators.required])],
      notify_period: ['', Validators.compose([Validators.required])],
      grace_period: ['', Validators.compose([Validators.required])],
      amount: ['', Validators.compose([Validators.required])],
      registered_date: ['', Validators.compose([Validators.required])],
      
    })
  }
  getData() {
    this.httpService.get('admin/tenant-subscription-history/' + this.branchId)
      .subscribe(result => {
        if (result.status == 200) {
          this.dataSource.data = result.data as Data[];
        } else {
          this.snackBService.openSnackBar(result.message, "Close")
        }
      });
  }

  ngOnDestroy() {
   // this.dataService.setData('branch_name', null)
  }


  submit() {
    let body = this.subscriptionForm.value;
    
    body['branch_id']=this.branchId;
    body['tenant_id']=this.tenantId;
    if (this.subscriptionForm.valid) {
      this.httpService.post('admin/tenant-subscription-add', body)
        .subscribe(result => {
          if (result.status == 200) {
            this.snackbService.openSnackBar(result.message, "Close");
            this.getData();
          } else {
            this.snackbService.openSnackBar(result.message, "Close")
          }
        });
    }
    else {
      this.validateAllFormFields(this.subscriptionForm)
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
  reset() {
    this.subscriptionForm.reset()
  }
  history(){
    const dialogRef = this.dialog.open(SubscriptionHistoryComponent, {
      width: '800px',
      data:{'branch_id':this.branchId,'tenant_id':this.tenantId},
      position: { top: '0px' }
    });
    dialogRef.afterClosed().subscribe(result => {
     
    }); 
  }
}
