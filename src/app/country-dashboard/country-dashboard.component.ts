import { Component } from "@angular/core";
import { CurrentCondition } from "src/types/CurrentConditions.interface";
import { LocationService } from "../services/location.service";

@Component({
    selector: 'app-country-dashboard',
    templateUrl: './country-dashboard.component.html',
    styleUrls: ['./country-dashboard.component.scss']
})

export class CountryDashboardComponent{
    country: string='';
    currentCondition= {} as CurrentCondition;

    constructor(private location: LocationService){}
    
    ngOnInit(){
        this.location.weatherObservable.subscribe(weatherData=>
            {
                this.country=weatherData.data.nearest_area[0].country[0].value
                this.currentCondition = weatherData.data.current_condition[0];
                console.log(this.currentCondition)
            }
        )
    };
}