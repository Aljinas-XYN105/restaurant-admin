import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Constants } from 'src/constants';
import { HttpServiceService } from '../_services/http-service.service';
import { LocalStorage } from '../_services/localstore.service';
import { SnackBarService } from '../_services/snack-bar.service';

@Component({
  selector: 'app-country-selection',
  templateUrl: './country-selection.component.html',
  styleUrls: ['./country-selection.component.scss']
})
export class CountrySelectionComponent {
  countriesArray: any = [];
  imagePath: any = this.constants.imageBasePath;
  constructor(private constants : Constants,private httpService: HttpServiceService, private snackbService: SnackBarService, private localService: LocalStorage, public dialogRef: MatDialogRef<CountrySelectionComponent>) {
  }

  ngOnInit(): void {
    this.getCountries()
  }

  getCountries() {
    this.httpService.get('countries')
      .subscribe(result => {
        if (result.status == 200) {
          this.countriesArray = result.data;
        } else {
          this.snackbService.openSnackBar(result.message, "")
        }
      });
  }

  close() {
    this.dialogRef.close()
  }

  countrySeleceted(country: any) {
    this.localService.store('countrySelected', country.id);
    window.location.reload()
  }
}
