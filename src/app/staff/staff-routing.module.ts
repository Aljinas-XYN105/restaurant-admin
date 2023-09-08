import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffComponent } from './staff.component';

const routes: Routes = [{ path: ':branch_id/:tenant_id', component: StaffComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
