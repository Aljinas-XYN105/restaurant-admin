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
import { AddBranchComponent } from './add-branch/add-branch.component';

export interface branchData {
  id: string;
  name: string;
  contact_no: string;
}

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent {
  displayedColumns: string[] = ['name', 'contact_no', 'actions'];
  public dataSource = new MatTableDataSource<branchData>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tenantName: any = this.dataService.getData('tenant_name')
  constructor(private dialogService: ConfirmationDialogService, private router: Router, private dataService: DataService, private snackBService: SnackBarService, private httpService: HttpServiceService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (this.dataService.getData('tenant_id')) {
      this.getData()
    }
    else {
      this.router.navigate(['tenant'])
    }
  }

  ngOnDestroy() {
    this.dataService.setData('tenant_id', null);
    this.dataService.setData('tenant_name', null);
  }

  getData() {
    this.httpService.get('admin/list-branch/' + this.dataService.getData('tenant_id'))
      .subscribe(result => {
        if (result.status == 200) {
          const data: any = [];
          result.data?.forEach((obj: any) => {
            let objData = {
              id: obj.id,
              name: obj.name,
              country_id: obj.country_id,
              city: obj.city_id,
              currency_id: obj.currency_id,
              contact_no: obj.contact_no,
              email: obj.email_id,
              tenant_id: obj.tenant_id,
            };
            data.push(objData);
          });
          this.dataSource.data = data as branchData[];
        } else {
          this.snackBService.openSnackBar(result.message, "Close")
        }
      });
  }

  addBranch() {
    const dialogRef = this.dialog.open(AddBranchComponent, {
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
    const dialogRef = this.dialog.open(AddBranchComponent, {
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

  staff(element: any) {
    this.dataService.setData('branch_id', element.id);
    this.dataService.setData('branch_name', element.name);
    this.router.navigate(['/staff']);
  }

  operations(element: any) {
    this.dataService.setData('branch_name', element.name);
    this.router.navigate(['/branches/' + element.id +'/'+this.dataService.getData('tenant_id')+'/'+ '/operations']);
  }
}
