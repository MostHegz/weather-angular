import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "../app-routing.module";
import { CityDashboardComponent } from "./city-dashboard.component";

@NgModule({
    declarations: [CityDashboardComponent],
    imports: [CommonModule, AppRoutingModule],
    exports: [CityDashboardComponent]
})

export class CityDashboardModule {}