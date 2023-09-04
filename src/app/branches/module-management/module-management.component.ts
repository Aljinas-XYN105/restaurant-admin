import { DataService } from 'src/app/_services/data.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/_services/http-service.service';
import { SnackBarService } from 'src/app/_services/snack-bar.service';

@Component({
  selector: 'app-module-management',
  templateUrl: './module-management.component.html',
  styleUrls: ['./module-management.component.scss']
})
export class ModuleManagementComponent {
  allModules: any = [];
  activeModules: any = [];
  branchId: any = this.route.snapshot.params['branch_id'];
  branchName: any;
  constructor(private snackBService: SnackBarService, private httpService: HttpServiceService, private dataService: DataService, private router: Router, private route: ActivatedRoute) {
    this.branchName = this.dataService.getData('branch_name')
  }
  ngOnInit(): void {
    // if (this.dataService.getData('branch_name') == null && this.dataService.getData('branch_name') == undefined) {
    //   this.router.navigate(['tenant'])
    // }
    // else {
    this.getAllModules();
    this.getActiveModules()
    // }
  }

  getAllModules() {
    this.httpService.get('all-menu')
      .subscribe(async (result) => {
        if (result.status == 200) {
          this.allModules = result.data;
        } else {
          this.snackBService.openSnackBar(result.message, "Close")
        }
      });
  }

  getActiveModules() {
    this.activeModules = []
    this.httpService.get('branch-menu/' + this.branchId)
      .subscribe(async (result) => {
        if (result.status == 200) {
          result.data.branch_menus?.forEach((obj: any) => {
            if (obj.status == 1) {
              this.activeModules.push({ 'id': obj.menu.id, 'name': obj.menu.name, 'status': obj.status });
            }
          });
        } else {
          this.snackBService.openSnackBar(result.message, "Close")
        }
      });
  }

  save() {
    let activeMenus: any = [];
    this.activeModules.forEach((obj: any) => {
      activeMenus.push({ 'menu_id': obj.id, 'name': obj.name, 'status': 1 })
    });
    let body = {
      'branch_menus': activeMenus,
      'branch_id': this.branchId
    }
    this.httpService
      .post('add-branch-menu', body)
      .subscribe(async (result) => {
        if (result.status == 200) {
          this.refresh()
        } else {
          this.snackBService.openSnackBar(result.message, "Close")
        }
      });
  }

  refresh() {
    this.getActiveModules();
    this.getAllModules()
  }

  drop(event: CdkDragDrop<any[]>) {
    console.log(event.container.data);
    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
