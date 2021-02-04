import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from "rxjs/operators";
import { CurrentCondition } from "src/types/CurrentConditions.interface";
import { searchApiInterface } from "src/types/searchApi.interface";
import { searchResultInterface } from "src/types/searchResult.interface";
import { LocationService } from "../services/location.service";

@Component({
    selector: 'app-country-dashboard',
    templateUrl: './country-dashboard.component.html',
    styleUrls: ['./country-dashboard.component.scss']
})

export class CountryDashboardComponent{
    country: string='';
    weatherIconUrl: string ='';
    weatherDescription: string ='';
    currentCondition= {} as CurrentCondition;

    myControl = new FormControl();
    filteredOptions={} as Observable<string[]>;
  
  
    private _filter(results: searchApiInterface):searchResultInterface[] {
        const filterValue = this.country.toLowerCase();
        return results.search_api.result.filter((result:searchResultInterface) => {
            return result.country[0].value.toLowerCase().includes(filterValue)
        });
    }

    normalizeResponse(data:searchResultInterface[]){
        return data.map((location:searchResultInterface)=>{
            return `${location.areaName[0].value}, ${location.country[0].value}`
        })
    }

    constructor(private location: LocationService){}
    
    ngOnInit(){
        this.location.weatherObservable.subscribe(weatherData=>
            {
                this.country=weatherData.data.nearest_area[0].country[0].value
                this.currentCondition = weatherData.data.current_condition[0];
                this.weatherIconUrl = weatherData.data.current_condition[0].weatherIconUrl[0].value;
                this.weatherDescription = weatherData.data.current_condition[0].weatherDesc[0].value;
                console.log(this.currentCondition)
            }
        )
        this.filteredOptions = this.myControl.valueChanges
        .pipe(
          debounceTime(1000),
          distinctUntilChanged(),
          switchMap((cityName: string) => {
              return this.location.getSearchLocation(this.country,cityName)
            }),
          map(response => {
              return this._filter(response)
            }),
            map(filteredData => this.normalizeResponse(filteredData))
            
        );
    };
}