import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable, Observer } from "rxjs";

@Injectable()
export class LocationService{
    constructor(private http:HttpClient){}
    //need to fix types here
    getLocationByGPS():Observable<any>{
        return Observable.create(((observer: Observer<any> )=>{
                navigator.geolocation.getCurrentPosition(position =>{
                    observer.next(position);
                    observer.complete();
                },
                error =>{
                    observer.error(error)
                }
                )
            })
        )
        
        // console.log(latitude,longitude);
        // return {latitude,longitude};
    }
    getLocationByIP(){
        return this.http.get(`https://geo.ipify.org/api/v1?apiKey=${environment.ipApiKey}`);
    }
    getLocation(): Observable<any>{
        if(!navigator.geolocation){
            return this.getLocationByIP();
        }else if(navigator.geolocation){
            return this.getLocationByGPS();
        }else{
            return this.getLocationByIP();
        }
    }
}