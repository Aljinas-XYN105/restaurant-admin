import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';
import { DataService } from 'src/app/_services/data.service';
import { HttpServiceService } from 'src/app/_services/http-service.service';
import { SnackBarService } from 'src/app/_services/snack-bar.service';
import { AddTenantComponent } from './add-tenant/add-tenant.component';

export interface tenantData {
  id: string;
  name: string;
}

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss']
})
export class TenantComponent {
  displayedColumns: string[] = ['name', 'contact_no', 'count', 'website', 'country', 'actions'];
  public dataSource = new MatTableDataSource<tenantData>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialogService: ConfirmationDialogService, private router: Router, private dataService: DataService, private snackBService: SnackBarService, private httpService: HttpServiceService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.httpService.get('admin/tenant')
      .subscribe(result => {
        if (result.status == 200) {
          const data: any = [];
          result.data?.forEach((obj: any) => {
            let objData = {
              id: obj.id,
              name: obj.name,
              contact_no: obj.contact_no,
              website: obj.website,
              country: obj.country,
              timezone: obj.timezone,
              count: obj.branch_count
            };
            data.push(objData);
          });
          this.dataSource.data = data as tenantData[];
        } else {
          this.snackBService.openSnackBar(result.message, "Close")
        }
      });
  }

  addTenant() {
    const dialogRef = this.dialog.open(AddTenantComponent, {
      width: '800px',
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

  deleteTenant(element: any) {
    const options = {
      title: 'Delete',
      message: 'Delete ' + element.name + ' ?',
      cancelText: 'NO',
      confirmText: 'YES'
    };
    this.dialogService.open(options);
    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.httpService.delete('admin/tenant' + '/' + element.id)
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
    const dialogRef = this.dialog.open(AddTenantComponent, {
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

  addBranch(element: any) {
    this.dataService.setData('tenant_id', element.id);
    this.dataService.setData('tenant_name', element.name);
    this.router.navigate(['branches'])
  }

}
