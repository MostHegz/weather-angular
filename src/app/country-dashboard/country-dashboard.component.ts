import { Component } from "@angular/core";
import { LocationService } from "../services/location.service";

@Component({
    selector: 'app-country-dashboard',
    templateUrl: './country-dashboard.component.html',
    styleUrls: ['./country-dashboard.component.scss']
})

export class CountryDashboardComponent{
    constructor(private location: LocationService){}
    
    ngOnInit(){
        // this.location.locationObservable.subscribe(data=>{
        //     console.log(data)
        // });
        this.location.weatherObservable.subscribe(data=> console.log(data))
        };
        // this.loc.getUserLocation(this.ipAddress).subscribe((data)=>{
        //     console.log('weather data', data);
        // })
}