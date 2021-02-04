import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { CountryDashboardComponent } from './country-dashboard/country-dashboard.component';
import { CountryDashboardModule } from './country-dashboard/country-dashboard.module';
import { CityDashboardModule } from './city-dashboard/city-dashboard.module';
import {LocationService} from './services/location.service';
// import { CityDashboardComponent } from './city-dashboard/city-dashboard.component';
// import { NotFound } from './not-found/notfound.component';
// import { NavBarComponent } from './navbar/navbar.component';
import {NavBarModule} from './navbar/navbar.module';
import {NotFoundModule} from './not-found/notfound.module'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CountryDashboardModule,
    CityDashboardModule,
    NotFoundModule,
    NavBarModule
  ],
  providers: [LocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
