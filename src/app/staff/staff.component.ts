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
import { AddStaffComponent } from './add-staff/add-staff.component';

  export interface staffData {
    id: string;
    name: string;
    email: string;
    contact_no: string;
    role:any;
    status:any;
  }

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent {
  displayedColumns: string[] = ['name', 'email', 'contact_no', 'role', 'status', 'actions'];
  public dataSource = new MatTableDataSource<staffData>();
  tenantId: any = this.route.snapshot.params['tenant_id'];
  branchId: any = this.route.snapshot.params['branch_id'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  branchName: any = this.dataService.getData('branch_name')
  constructor(private route: ActivatedRoute, private dialogService: ConfirmationDialogService, private router: Router, private dataService: DataService, private snackBService: SnackBarService, private httpService: HttpServiceService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (this.dataService.getData('branch_name')) {
      this.getData()
    }
    else {
      this.router.navigate(['tenant'])
    }
  }


  getData() {
    this.httpService.get('admin/list-staff/' + this.branchId)
      .subscribe(result => {
        if (result.status == 200) {
          const data: any = [];
          result.data?.forEach((obj: any) => {
            let objData = {
              id: obj.id,
              name: obj.user?.name,
              email: obj.user?.email,
              role: obj.user?.role.name,
              contact_no: obj.user?.contact_no,
              status: obj.status,
              user: obj.user
            };
            data.push(objData);
          });
          this.dataSource.data = data as staffData[];
        } else {
          this.snackBService.openSnackBar(result.message, "Close")
        }
      });
  }

  addBranch() {
    const dialogRef = this.dialog.open(AddStaffComponent, {
      width: '800px',
      data: {
        'branch_id': this.branchId,
        'tenant_id': this.tenantId
      },
      position: { top: '0px' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData()
      }
    });
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
      title: 'Inactive',
      message: 'Are you sure to make these ' + element.name + ' inactive ?',
      cancelText: 'NO',
      confirmText: 'YES'
    };
    this.dialogService.open(options);
    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.httpService.delete('staff' + '/' + element.id)
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
    const dialogRef = this.dialog.open(AddStaffComponent, {
      width: '600px',
      data: {
        operation: 'edit',
        editData: element,
        branch_id: this.branchId,
        tenant_id: this.tenantId
      },
      position: { top: '0px' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData()
      }
    });
  }
}
