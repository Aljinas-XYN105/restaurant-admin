import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/_services/data.service';
import { AddRegistrationComponent } from '../add-registration/add-registration.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class OperationsComponent {
  branchId: any = this.route.snapshot.params['branch_id'];
  tenantId:any=this.route.snapshot.params['tenanat_id'];
  branchName: any;
  constructor(private route: ActivatedRoute, public dataService: DataService, private router: Router, public dialog: MatDialog) {
    this.branchName = this.dataService.getData('branch_name')
   
  }
  ngOnInit(): void {
    if (!this.dataService.getData('branch_name')) {
      this.router.navigate(['tenant'])
    }
  }

  // ngOnDestroy() {
  //   this.dataService.setData('branch_name', null)
  // }

  moduleManagement() {
    this.dataService.setData('branch_name', this.branchName);
    this.router.navigate(['branches/' + this.branchId + '/operations/module-management'])
  }
  registrations(){
    console.log(this.branchName);
    this.dataService.setData('branch_name', this.branchName);
    this.router.navigate(['branches/' + this.branchId +'/'+this.tenantId+ '/operations/registrations'])
   
  }
  printerLogo(){
    
  }
}