import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private constants: Constants,private router: Router, private httpService: HttpServiceService, private snackbService: SnackBarService, private localService: LocalStorage) {
  }

  ngOnInit(): void {
    // this.getCountries()
  }

  logout() {
    this.router.navigate(['login'])
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
