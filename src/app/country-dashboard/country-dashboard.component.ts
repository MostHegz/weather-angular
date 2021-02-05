import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from "rxjs/operators";
import { CurrentCondition } from "src/types/CurrentConditions.interface";
import { searchApiInterface } from "src/types/searchApi.interface";
import { searchResultInterface } from "src/types/searchResult.interface";
import { WeatherData } from "src/types/WeatherData.Interface";
import { LocationService } from "../services/location.service";
import { countryList } from "./country-list";

@Component({
    selector: 'app-country-dashboard',
    templateUrl: './country-dashboard.component.html',
    styleUrls: ['./country-dashboard.component.scss']
})

export class CountryDashboardComponent{
    //this should be the best case but there is a bug shown in 
    //https://github.com/primefaces/primeng/issues/9636
    // cityForm = new FormGroup({
    //     country: new FormControl('',[Validators.required]),
    //     city: new FormControl('',[Validators.required])
    // });
    myControl = new FormControl('',[Validators.required]);
    country =  '';
    formCountry= {} as string;
    city= '';
    formCity = {} as string;
    weatherIconUrl= {} as string;
    weatherDescription= {} as string;
    currentCondition= {} as CurrentCondition;
    filteredOptions={} as Observable<string[]>;
    cityOptions={} as string[];
    country_list = countryList;
    selectedValue= {} as string;
    
  
    private _filter(results: searchApiInterface):searchResultInterface[] {
        const filterValue = this.formCountry.toLowerCase();
        this.cityOptions = results.search_api.result
            .map((result: searchResultInterface)=> result.areaName[0].value)
            console.log(this.cityOptions)
        return results.search_api.result
            .filter((result:searchResultInterface) => {
                return result.country[0].value.toLowerCase().includes(filterValue)
        });
    }

    normalizeResponse(data:searchResultInterface[]){
        return data.map((location:searchResultInterface)=>{
            this.formCity = location.areaName[0].value;
            console.log('',this.formCity)
            console.log('',this.cityOptions)

            return `${location.areaName[0].value}, ${location.country[0].value}`
        })
    }

    constructor(private location: LocationService){}
    
    setCurrentConditions(weatherData: WeatherData){
        this.country=weatherData.data.nearest_area[0].country[0].value
        this.city= weatherData.data.nearest_area[0].areaName[0].value
        this.currentCondition = weatherData.data.current_condition[0];
        this.weatherIconUrl = weatherData.data.current_condition[0].weatherIconUrl[0].value;
        this.weatherDescription = weatherData.data.current_condition[0].weatherDesc[0].value;
    }

    updateCurrentConditions(){
        this.location.getWeatherByLocation(this.formCity,this.formCountry)
            .subscribe(weatherData => this.setCurrentConditions(weatherData))
    }

    ngOnInit(){
        this.location.weatherObservableFromIp.subscribe(weatherData=>{
            this.formCountry = weatherData.data.nearest_area[0].country[0].value;
            this.setCurrentConditions(weatherData)
        })

        //too much impure in pipe functions here that need to be handled
        this.filteredOptions = this.myControl.valueChanges
        .pipe(
            //the search api is strict
          debounceTime(500),
          distinctUntilChanged(),
          switchMap((cityName: string) => {
              return this.location.getSearchLocation(this.formCountry,cityName)
            }),
          map(response => this._filter(response)),
          map(filteredData => this.normalizeResponse(filteredData)),      
        );

        // this.cityForm = this.fb.group({
        //     country: ['',Validators.required],
        //     city: ['',Validators.required]
        // })
    };
}