import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  {
    path: 'dashboard',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'branches', loadChildren: () => import('./branches/branches.module').then(m => m.BranchesModule) },
  { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
  { path: 'tenant', loadChildren: () => import('./tenant/tenant.module').then(m => m.TenantModule) },
  { path: 'staff', loadChildren: () => import('./staff/staff.module').then(m => m.StaffModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
