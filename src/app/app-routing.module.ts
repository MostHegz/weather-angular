import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityDashboardComponent } from './city-dashboard/city-dashboard.component';
import { CountryDashboardComponent } from './country-dashboard/country-dashboard.component';
import { NotFound } from './not-found/notfound.component';

const routes: Routes = [
  {
    path:'',
    component: CountryDashboardComponent
  },
  {
    path:'city',
    component: CityDashboardComponent
  },
  {
    path: '**',
    component: NotFound
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
