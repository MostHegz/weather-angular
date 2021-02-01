import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountryDashboardModule } from './country-dashboard/country-dashboard.module';
import { IpServiceService } from './services/ip-service.service';
import {LocationService} from './services/location.service'
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CountryDashboardModule
  ],
  providers: [LocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
