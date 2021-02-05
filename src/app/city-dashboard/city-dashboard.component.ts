import { Component } from "@angular/core";
import { CurrentCondition } from "src/types/CurrentConditions.interface";
import { LocationService } from "../services/location.service";
import { ActivatedRoute } from '@angular/router';
import { switchMap } from "rxjs/operators";
import { WeatherData } from "src/types/WeatherData.Interface";
import { AverageClimateData } from "src/types/AverageClimateData.interface";
import { DayWeather } from "src/types/dayWeather.interface";
import { MonthlyClimate } from "src/types/MonthlyClimate.interface";
@Component({
    selector: 'app-city-dashboard',
    templateUrl: './city-dashboard.component.html',
    styleUrls: ['./city-dashboard.component.scss']
})

export class CityDashboardComponent{
    country: string='';
    city: string='';
    currentCondition= {} as CurrentCondition;
    wholeDaysWeather ={} as DayWeather[];
    // monthlyClimateAverages= {} as MonthlyClimate[];
    monthlyTemp= {} as {x: number, y: number}[]

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
            return this.location.getClimateAveragesByLocation(params['city'],params['country'])
            })
        ).subscribe(data =>{
            this.setLocation(data)
            this.setCurrentConditions(data);
            // this.setMonthlyClimateAverages(data);
            this.setMonthlyTemp(data);
            this.setWholeDaysWeather(data)
        });
    };

    // setMonthlyClimateAverages(data: AverageClimateData){
    //     this.monthlyClimateAverages = data.data.ClimateAverages[0].month;
    // }
    setWholeDaysWeather(data:AverageClimateData){
        this.wholeDaysWeather = data.data.weather;
    }
    setLocation(data: AverageClimateData){
        this.country=data.data.nearest_area[0].country[0].value;
        this.city = data.data.nearest_area[0].areaName[0].value;
    }
    setCurrentConditions(weatherData: WeatherData){
        this.currentCondition = weatherData.data.current_condition[0];
        // this.weatherIconUrl = weatherData.data.current_condition[0].weatherIconUrl[0].value;
        // this.weatherDescription = weatherData.data.current_condition[0].weatherDesc[0].value;
    }
    setMonthlyTemp(data: AverageClimateData){
        this.monthlyTemp = data.data.ClimateAverages[0].month.map((element: MonthlyClimate)=>{
            return( {
                x: parseInt(element.index),
                y: parseInt(element.avgMaxTemp),
                // minTemp: parseInt(element.avgMinTemp),
            })
        })
    }
}