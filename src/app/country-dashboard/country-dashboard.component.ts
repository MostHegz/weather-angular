import { Component } from "@angular/core";
// import { IpServiceService } from "../services/ip-service.service";
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
        this.location.getLocationByIP().subscribe((res:any)=>{
            this.ipAddress=res.ip;
            console.log(res)
        });
        // this.loc.getUserLocation(this.ipAddress).subscribe((data)=>{
        //     console.log('weather data', data);
        // })
    }
}