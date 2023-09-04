import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { WorkingHoursComponent } from './working-hours/working-hours.component';

const routes: Routes = [{ path: '', component: SettingsComponent },
{path: 'working-hours' , component : WorkingHoursComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
