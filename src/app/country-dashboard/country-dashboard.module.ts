import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../material.module";
import { CountryDashboardComponent } from "./country-dashboard.component";

@NgModule({
    declarations: [CountryDashboardComponent],
    imports: [CommonModule,MaterialModule],
    exports: [CountryDashboardComponent]
})

export class CountryDashboardModule {}