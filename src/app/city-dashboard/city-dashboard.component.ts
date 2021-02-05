import { Component, ElementRef, ViewChild } from "@angular/core";
import { CurrentCondition } from "src/types/CurrentConditions.interface";
import { LocationService } from "../services/location.service";
import { ActivatedRoute } from '@angular/router';
import { switchMap } from "rxjs/operators";
import { WeatherData } from "src/types/WeatherData.Interface";
import { AverageClimateData } from "src/types/AverageClimateData.interface";
import { DayWeather } from "src/types/DayWeather.interface";
import { MonthlyClimate } from "src/types/MonthlyClimate.interface";
import { LineChartData } from "src/types/LineChartData.interface";
// import { Observable } from "rxjs";
// import { element } from "protractor";
@Component({
    selector: 'app-city-dashboard',
    templateUrl: './city-dashboard.component.html',
    styleUrls: ['./city-dashboard.component.scss']
})

export class CityDashboardComponent{
    country: string='';
    city: string='';
    currentCondition= {} as CurrentCondition;
    wholeDaysWeather ={} as DayWeather;
    monthlyClimateAverages= {} as MonthlyClimate[];
    monthlyTemp= {} as LineChartData[]
    chartedData = {} as LineChartData[];
    selectedButton={} as string
    @ViewChild('chartRef', { static: false }) chart= {} as ElementRef;

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
            this.setMonthlyClimateAverages(data);
            this.setMonthlyTemp(data);
            this.setWholeDaysWeather(data)
        });
        this.setChartedData(this.selectedButton)
    };
    selectionChanged(item:{value:string}) {
        // console.log("Selected value: " + item.value);
        // console.log(this.chart)
        this.setChartedData(item.value)
    }

    //needs to be cleaned
    setChartedData(toggleValue:string){
        if (toggleValue === "hourly") {
            this.chartedData = this.wholeDaysWeather.hourly.map(element=>{
                return( {
                    x: parseInt(element.time),
                    y: parseInt(element.tempC),
                    // minTemp: parseInt(element.avgMinTemp),
                })
            })
            // console.log(this.chartedData)
        }else if (toggleValue === "monthly") {
            this.chartedData = this.monthlyTemp
        }else if (toggleValue === "monthlyAvg") {
            this.chartedData = this.monthlyClimateAverages
                .map(element=>{
                    return ({
                        x: parseInt(element.index),
                        y: parseInt(element.avgMinTemp)
                    })
                })
        }
    }

    setMonthlyClimateAverages(data: AverageClimateData){
        this.monthlyClimateAverages = data.data.ClimateAverages[0].month;
    }
    setWholeDaysWeather(data:AverageClimateData){
        this.wholeDaysWeather = data.data.weather[0];
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
        this.monthlyTemp = data.data.ClimateAverages[0].month
            .map((element: MonthlyClimate)=>{
                return( {
                    x: parseInt(element.index),
                    y: parseInt(element.avgMaxTemp),
                    // minTemp: parseInt(element.avgMinTemp),
                })
            })
    }
}