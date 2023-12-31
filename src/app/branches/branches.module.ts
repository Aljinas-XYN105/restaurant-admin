import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchesRoutingModule } from './branches-routing.module';
import { BranchesComponent } from './branches.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ConfirmationDialogService } from '../_services/confirmation-dialog.service';
import { MatDialogModule } from '@angular/material/dialog';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OperationsComponent } from './operations/operations.component';
import { ModuleManagementComponent } from './module-management/module-management.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AddRegistrationComponent } from './add-registration/add-registration.component';
import { RegistrationsComponent } from './registrations/registrations.component';
import { AssignStaffComponent } from './assign-staff/assign-staff.component';
import { CopyMenuModifiersComponent } from './copy-menu-modifiers/copy-menu-modifiers.component';
import { MenuCopyComponent } from './menu-copy/menu-copy.component';
import { SubscriptionHistoryComponent } from './subscription-history/subscription-history.component';
import { PrinterLogoUploadComponent } from './printer-logo-upload/printer-logo-upload.component';
import { CustomerUploadComponent } from './customer-upload/customer-upload.component';
import { BranchLicenseKeyComponent } from './branch-license-key/branch-license-key.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BranchMenuRefreshComponent } from './branch-menu-refresh/branch-menu-refresh.component';
import { InventoryMenuRefreshComponent } from './inventory-menu-refresh/inventory-menu-refresh.component';
@NgModule({
  declarations: [
    BranchesComponent,
    AddBranchComponent,
    OperationsComponent,
    ModuleManagementComponent,
    AddRegistrationComponent,
    RegistrationsComponent,
    AssignStaffComponent,
    MenuCopyComponent,
    CopyMenuModifiersComponent,
    SubscriptionHistoryComponent,
    PrinterLogoUploadComponent,
    CustomerUploadComponent,
    BranchLicenseKeyComponent,
    BranchMenuRefreshComponent,
    InventoryMenuRefreshComponent
  ],
  imports: [
    CommonModule,
    BranchesRoutingModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    DragDropModule,
    MatTooltipModule
  ],
  providers: [
    MatDatepickerModule, ConfirmationDialogService
  ]
})
export class BranchesModule { }
