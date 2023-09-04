import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchesComponent } from './branches.component';
import { OperationsComponent } from './operations/operations.component';
import { ModuleManagementComponent } from './module-management/module-management.component';
import { RegistrationsComponent } from './registrations/registrations.component';

const routes: Routes = [{ path: '', component: BranchesComponent },
{ path: ':branch_id/:tenanat_id/operations', component: OperationsComponent },
{ path: ':branch_id/:tenanat_id/operations/registrations', component: RegistrationsComponent },
{ path: ':branch_id/operations/module-management', component: ModuleManagementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchesRoutingModule { }
