import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable()
export class LocationService{
    constructor(private http:HttpClient){}
    getLocationByGPS(){
        
    }
    getLocationByIP(){
        return this.http.get(`https://geo.ipify.org/api/v1?apiKey=${environment.ipApiKey}`);
    }
}