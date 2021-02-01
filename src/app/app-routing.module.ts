import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryDashboardComponent } from './country-dashboard/country-dashboard.component';

const routes: Routes = [
  {
    path:'',
    component: CountryDashboardComponent
  },
  // {
  //   path:'city',

  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
