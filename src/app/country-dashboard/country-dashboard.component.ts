import { Component } from "@angular/core";
import { LocationService } from "../services/location.service";

@Component({
    selector: 'app-country-dashboard',
    templateUrl: './country-dashboard.component.html',
    styleUrls: ['./country-dashboard.component.scss']
})

export class CountryDashboardComponent{
    constructor(private location: LocationService){}
    ipAddress:string=''; 
    ngOnInit(){
        this.location.getLocation().subscribe((res:any)=>{
            //location handler (might even make the location service a weather service)
        });
        // this.loc.getUserLocation(this.ipAddress).subscribe((data)=>{
        //     console.log('weather data', data);
        // })
    }
}