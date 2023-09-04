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

export interface Data {
  id: string;
  Registered_date: any;
  Expiry_date: any;
 notice_period: any;
 grace_period:any;
 amount:any;
}

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss']
})
export class RegistrationsComponent {
  displayedColumns: string[] = ['Registered_date', 'Expiry_date','notice_period','grace_period','amount'];
  public dataSource = new MatTableDataSource<Data>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tenantName: any = this.dataService.getData('tenant_name')
  branchId: any = this.route.snapshot.params['branch_id'];
  tenantId:any=this.route.snapshot.params['tenanat_id'];
  branchName:any;
  constructor(private dialogService: ConfirmationDialogService, private router: Router, private dataService: DataService, private snackBService: SnackBarService, private httpService: HttpServiceService, public dialog: MatDialog,private route:ActivatedRoute) {
    this.branchName = this.dataService.getData('branch_name')
 
  }

  ngOnInit(): void {
    this.getData();
  }

  // ngOnDestroy() {
  //   this.dataService.setData('tenant_id', null);
  //   this.dataService.setData('tenant_name', null);
  // }

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

  addBranch() {
    const dialogRef = this.dialog.open(AddRegistrationComponent, {
      width: '800px',
      data:{'branch_id':this.branchId,'tenant_id':this.tenantId},
      position: { top: '0px' }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  ngOnDestroy() {
    this.dataService.setData('branch_name', null)
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deletePost(element: any) {
    const options = {
      title: 'Delete',
      message: 'Delete ' + element.name + ' ?',
      cancelText: 'NO',
      confirmText: 'YES'
    };
    this.dialogService.open(options);
    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.httpService.delete('branch' + '/' + element.id)
          .subscribe(result => {
            if (result.status == 200) {
              this.snackBService.openSnackBar(result.message, "Close");
              this.getData()
            } else {
              this.snackBService.openSnackBar(result.message, "Close");
            }
          });
      }
    });
  }

  editData(element: any) {
    let data = {
      operation: 'edit',
      editData: element
    }
    const dialogRef = this.dialog.open(AddRegistrationComponent, {
      width: '600px',
      data: data,
      position: { top: '0px' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData()
      }
    });
  }

  
  
}
