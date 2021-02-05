import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CityDashboardModule } from "../city-dashboard/city-dashboard.module";
import { LineChart } from "./line-chart.component";

@NgModule({
    declarations: [LineChart],
    imports: [CommonModule, CityDashboardModule,],
    exports: [LineChart]
})

export class GraphModule {}