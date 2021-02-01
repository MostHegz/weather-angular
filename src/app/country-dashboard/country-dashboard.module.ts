import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CountryDashboardComponent } from "./country-dashboard.component";

@NgModule({
    declarations: [CountryDashboardComponent],
    imports: [CommonModule],
    exports: [CountryDashboardComponent]
})

export class CountryDashboardModule {}