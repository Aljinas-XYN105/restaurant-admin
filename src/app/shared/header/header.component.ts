import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';
import { DataService } from 'src/app/_services/data.service';
import { HttpServiceService } from 'src/app/_services/http-service.service';
import { LocalStorage } from 'src/app/_services/localstore.service';
import { SnackBarService } from 'src/app/_services/snack-bar.service';
import { Constants } from 'src/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  countriesArray: any = [];
  countrySelected: any = this.localService.get('countrySelected')
  imagePath: any = this.constants.imageBasePath;
  constructor(private dialogService: ConfirmationDialogService, private constants: Constants,private router: Router, private httpService: HttpServiceService, private snackbService: SnackBarService, private localService: LocalStorage) {
  }

  ngOnInit(): void {
    // this.getCountries()
  }

  logout() {
   
    const options = {
      title: 'Logout',
      message: 'Are you sure ?',
      cancelText: 'NO',
      confirmText: 'YES'
    };
    this.dialogService.open(options);
    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.httpService.post('admin/logout',null)
          .subscribe(result => {
            if (result.status == 200) {
              this.router.navigate(['login'])
            } else {
              this.snackbService.openSnackBar(result.message, "Close")
            }
          });
      }
    });
  }

  // getCountries() {
  //   this.httpService.get('countries')
  //     .subscribe(result => {
  //       if (result.status == 200) {
  //         this.countriesArray = result.data;
  //       } else {
  //         this.snackbService.openSnackBar(result.message, "")
  //       }
  //     });
  // }

  countrySeleceted() {
    this.localService.store('countrySelected', this.countrySelected);
    window.location.reload()
  }

}
