import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "../app-routing.module";
import { MaterialModule } from "../material.module";
import { CountryDashboardComponent } from "./country-dashboard.component";

@NgModule({
    declarations: [CountryDashboardComponent],
    imports: [CommonModule,MaterialModule,AppRoutingModule],
    exports: [CountryDashboardComponent]
})

export class CountryDashboardModule {}