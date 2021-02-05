import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "../app-routing.module";
import { LineChart } from "../line-chart/line-chart.component";
import { CityDashboardComponent } from "./city-dashboard.component";

@NgModule({
    declarations: [CityDashboardComponent, LineChart],
    imports: [CommonModule, AppRoutingModule],
    exports: [CityDashboardComponent]
})

export class CityDashboardModule {}