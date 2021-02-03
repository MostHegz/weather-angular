import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CityDashboardComponent } from "./city-dashboard.component";

@NgModule({
    declarations: [CityDashboardComponent],
    imports: [CommonModule],
    exports: [CityDashboardComponent]
})

export class CityDashboardModule {}