import { Component } from "@angular/core";
import { CurrentCondition } from "src/types/CurrentConditions.interface";
import { LocationService } from "../services/location.service";

@Component({
    selector: 'app-city-dashboard',
    templateUrl: './city-dashboard.component.html',
    styleUrls: ['./city-dashboard.component.scss']
})

export class CityDashboardComponent{
    country: string='';
    currentCondition= {} as CurrentCondition;

    constructor(private location: LocationService){}
    
    ngOnInit(){
        this.location.weatherObservableFromIp.subscribe(weatherData=>
            {
                this.country=weatherData.data.nearest_area[0].country[0].value
                this.currentCondition = weatherData.data.current_condition[0];
            }
        )
    };
}