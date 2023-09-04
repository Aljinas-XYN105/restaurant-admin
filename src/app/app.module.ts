import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { HomeModule } from './home/home.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { Constants } from 'src/constants';
import { Preloader } from './shared/preloader/preloader.service';
import { CryptoService } from './_services/crypto.service';
import { LocalStorage } from './_services/localstore.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ConfirmationDialogService } from './_services/confirmation-dialog.service';
import { LoginModule } from './login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { CountrySelectionComponent } from './country-selection/country-selection.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddDescriptionComponent } from './add-description/add-description.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    ConfirmationDialogComponent,
    CountrySelectionComponent,
    AddDescriptionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HomeModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    LoginModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    AngularEditorModule
  ],
  providers: [Constants,Preloader,CryptoService,LocalStorage,ConfirmationDialogService,{provide: MAT_DATE_LOCALE, useValue: 'en-GB'},],
  bootstrap: [AppComponent]
})
export class AppModule { }
