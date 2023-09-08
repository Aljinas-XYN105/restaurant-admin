import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpServiceService } from 'src/app/_services/http-service.service';
import { SnackBarService } from 'src/app/_services/snack-bar.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
export interface Data {
  id: string;
  date: any;
  time: any;
  amount: any;
}
@Component({
  selector: 'app-subscription-history',
  templateUrl: './subscription-history.component.html',
  styleUrls: ['./subscription-history.component.scss']
})
export class SubscriptionHistoryComponent {
  displayedColumns: string[] = ['date', 'time',  'amount'];
  public dataSource = new MatTableDataSource<Data>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  constructor( @Inject(MAT_DIALOG_DATA) public data: { branch_id: any, tenant_id: any }, 
    private httpService: HttpServiceService, 
    private snackbService: SnackBarService, 
    public dialogRef: MatDialogRef<SubscriptionHistoryComponent>) {
  }
  ngOnInit() {
    this.httpService.get('admin/branch-payment-history/' + this.data?.branch_id,false)
    .subscribe(result => {
      if (result.status == 200) {
       
        this.dataSource.data = result.data as Data[];
      } else {
        this.snackbService.openSnackBar(result.message, "Close")
      }
    });
  }
  close() {
    this.dialogRef.close()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
