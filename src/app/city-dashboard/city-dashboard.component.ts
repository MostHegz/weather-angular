import { Component } from "@angular/core";
import { CurrentCondition } from "src/types/CurrentConditions.interface";
import { LocationService } from "../services/location.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from "rxjs/operators";
import { WeatherData } from "src/types/WeatherData.Interface";
@Component({
    selector: 'app-city-dashboard',
    templateUrl: './city-dashboard.component.html',
    styleUrls: ['./city-dashboard.component.scss']
})

export class CityDashboardComponent{
    country: string='';
    city: string='';
    currentCondition= {} as CurrentCondition;

    constructor(
        private location: LocationService, 
        private route: ActivatedRoute
        ){}
    
    ngOnInit(){
        this.route.queryParams
        .pipe(
            switchMap(params => {
            this.city = params['city'];
            this.country = params['country'];
            return this.location.getWeatherByLocation(params['city'],params['country'])
            })
        ).subscribe(data => console.log(data))
        ;
    };

    setCurrentConditions(weatherData: WeatherData){
        this.country=weatherData.data.nearest_area[0].country[0].value
        this.currentCondition = weatherData.data.current_condition[0];
        // this.weatherIconUrl = weatherData.data.current_condition[0].weatherIconUrl[0].value;
        // this.weatherDescription = weatherData.data.current_condition[0].weatherDesc[0].value;
    }
}