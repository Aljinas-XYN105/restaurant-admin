import { Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, shareReplay } from 'rxjs/operators';
import { CountrySelectionComponent } from './country-selection/country-selection.component';
import { LocalStorage } from './_services/localstore.service';
import { SnackBarService } from './_services/snack-bar.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sidenav-with-multilevel-menu';
  isSideNavCollapsed = false;
  screenWidth = 0;
  public url: any;
  countrySelected: any;
  constructor(public dialog: MatDialog, private router: Router, private localService: LocalStorage, private snackBservice: SnackBarService) {
    router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        this.url = e.url;
        this.countrySelected = this.localService.get('countrySelected')
        // if ((this.countrySelected == null || this.countrySelected == undefined) && this.url != '/login') {
        //   this.openCountrySelectionModal()
        // }
      });
  }
  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  openCountrySelectionModal() {
    const dialogRef = this.dialog.open(CountrySelectionComponent, {
      disableClose: true,
      width: '800px',
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
