import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, map, switchMap } from "rxjs/operators";
import { CurrentCondition } from "src/types/CurrentConditions.interface";
import { searchApiInterface } from "src/types/searchApi.interface";
import { searchResultInterface } from "src/types/searchResult.interface";
import { WeatherData } from "src/types/WeatherData.Interface";
import { LocationService } from "../services/location.service";

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

    country: string='';
    formCountry: string='';
    city: string='';
    weatherIconUrl: string ='';
    weatherDescription: string ='';
    currentCondition= {} as CurrentCondition;
    filteredOptions={} as Observable<string[]>;
    country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
    selectedValue: string='';
    
  
    private _filter(results: searchApiInterface):searchResultInterface[] {
        const filterValue = this.formCountry.toLowerCase();
        return results.search_api.result.filter((result:searchResultInterface) => {
            return result.country[0].value.toLowerCase().includes(filterValue)
        });
    }

    normalizeResponse(data:searchResultInterface[]){
        return data.map((location:searchResultInterface)=>{
            this.city = location.areaName[0].value;
            return `${location.areaName[0].value}, ${location.country[0].value}`
        })
    }

    constructor(private location: LocationService){}
    
    setCurrentConditions(weatherData: WeatherData){
        this.country=weatherData.data.nearest_area[0].country[0].value
        this.currentCondition = weatherData.data.current_condition[0];
        this.weatherIconUrl = weatherData.data.current_condition[0].weatherIconUrl[0].value;
        this.weatherDescription = weatherData.data.current_condition[0].weatherDesc[0].value;

    }

    updateCurrentConditions(){
        this.location.getWeatherByLocation(this.city,this.formCountry)
            .subscribe(weatherData => this.setCurrentConditions(weatherData))
    }

    ngOnInit(){
        this.location.weatherObservableFromIp.subscribe(weatherData=>{
            this.formCountry = weatherData.data.nearest_area[0].country[0].value;
            this.setCurrentConditions(weatherData)
        })

        this.filteredOptions = this.myControl.valueChanges
        .pipe(
          debounceTime(300),
          distinctUntilChanged(),
          switchMap((cityName: string) => {
              return this.location.getSearchLocation(this.country,cityName)
            }),
          map(response => this._filter(response)),
          map(filteredData => this.normalizeResponse(filteredData))
        );

        // this.cityForm = this.fb.group({
        //     country: ['',Validators.required],
        //     city: ['',Validators.required]
        // })
    };
}