import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchesComponent } from './branches.component';
import { OperationsComponent } from './operations/operations.component';
import { ModuleManagementComponent } from './module-management/module-management.component';
import { RegistrationsComponent } from './registrations/registrations.component';
import { AssignStaffComponent } from './assign-staff/assign-staff.component';
import { CopyMenuModifiersComponent } from './copy-menu-modifiers/copy-menu-modifiers.component';
import { MenuCopyComponent } from './menu-copy/menu-copy.component';

const routes: Routes = [{ path: '', component: BranchesComponent },
{ path: ':branch_id/:tenanat_id/operations', component: OperationsComponent },
{ path: ':branch_id/:tenanat_id/operations/registrations', component: RegistrationsComponent },
{ path: ':branch_id/:tenanat_id/operations/assign-staff', component: AssignStaffComponent },
{ path: ':branch_id/operations/module-management', component: ModuleManagementComponent },
{ path: ':branch_id/:tenant_id/operations/menu-copy', component: MenuCopyComponent },
{ path: ':branch_id/:tenant_id/operations/copy-menu-modifiers', component: CopyMenuModifiersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchesRoutingModule { }
