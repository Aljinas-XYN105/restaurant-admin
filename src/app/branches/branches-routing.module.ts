import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchesComponent } from './branches.component';
import { OperationsComponent } from './operations/operations.component';
import { ModuleManagementComponent } from './module-management/module-management.component';
import { RegistrationsComponent } from './registrations/registrations.component';
import { AssignStaffComponent } from './assign-staff/assign-staff.component';
import { CopyMenuModifiersComponent } from './copy-menu-modifiers/copy-menu-modifiers.component';
import { MenuCopyComponent } from './menu-copy/menu-copy.component';
import { PrinterLogoUploadComponent } from './printer-logo-upload/printer-logo-upload.component';
import { CustomerUploadComponent } from './customer-upload/customer-upload.component';
import { BranchLicenseKeyComponent } from './branch-license-key/branch-license-key.component';
import { BranchMenuRefreshComponent } from './branch-menu-refresh/branch-menu-refresh.component';
import { InventoryMenuRefreshComponent } from './inventory-menu-refresh/inventory-menu-refresh.component';

const routes: Routes = [{ path: '', component: BranchesComponent },
{ path: ':branch_id/:tenant_id/operations', component: OperationsComponent },
{ path: ':branch_id/:tenant_id/operations/registrations', component: RegistrationsComponent },
{ path: ':branch_id/:tenant_id/operations/assign-staff', component: AssignStaffComponent },
{ path: ':branch_id/:tenant_id/operations/module-management', component: ModuleManagementComponent },
{ path: ':branch_id/:tenant_id/operations/menu-copy', component: MenuCopyComponent },
{ path: ':branch_id/:tenant_id/operations/copy-menu-modifiers', component: CopyMenuModifiersComponent },
{ path: ':branch_id/:tenant_id/operations/branch-menu-refresh', component: BranchMenuRefreshComponent },
{ path: ':branch_id/:tenant_id/operations/inventory-menu-refresh', component: InventoryMenuRefreshComponent },
{ path: ':branch_id/:tenant_id/operations/printer-logo', component: PrinterLogoUploadComponent },
{ path: ':branch_id/:tenant_id/operations/customer-upload', component: CustomerUploadComponent },
{ path: ':branch_id/:tenant_id/operations/license-key', component: BranchLicenseKeyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchesRoutingModule { }
