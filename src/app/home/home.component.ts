import { Component } from '@angular/core';
import { HttpServiceService } from '../_services/http-service.service';
import { SnackBarService } from '../_services/snack-bar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  tenantNo:any;
  branchNo:any;
  usersNo:any;
  constructor(private httpService : HttpServiceService,private snackBService : SnackBarService) {
  }

  ngOnInit() {
    this.getDashboard()
  }

  getDashboard() {
    this.httpService.get('admin/dashboard')
    .subscribe(result => {
      if (result.status == 200) {
        this.tenantNo =  result.data.total_tenants;
        this.branchNo =  result.data.total_branches;
        this.usersNo =  result.data.total_users;
      } else {
        this.snackBService.openSnackBar(result.message, "Close");
      }
    });
  }

}
