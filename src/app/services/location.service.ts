import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { switchMap , share } from "rxjs/operators";
import { IPData } from "src/types/IPData.interface";
import { WeatherData } from "src/types/WeatherData.Interface";

@Injectable()
export class LocationService{
    locationObservable: Observable<IPData> = this.getLocationByIP();

    weatherObservable: Observable<WeatherData> = this.locationObservable
        .pipe(
            switchMap((ipData: IPData) =>
                {
                    return this.getWeather(ipData.ip);
                }
            ),
            share()
    )
    constructor(private http:HttpClient){}
    
    
    getLocationByIP(){
        return this.http
            .get<IPData>(`https://geo.ipify.org/api/v1?apiKey=${environment.ipApiKey}`);
    }

    getWeather(ipAddress: string){
        return this.http.get<WeatherData>(`http://api.worldweatheronline.com/premium/v1/weather.ashx?key=${environment.weatherApiKey}&q=${ipAddress}&num_of_days=1&includelocation=yes&fx=no&mca=no&extra=isDayTime&format=json`)
    }
}

// getLocationByGPS():Observable<CoordinatesInterface>{
//     return Observable.create(((observer: Observer<any> )=>{
//             navigator.geolocation.getCurrentPosition(position =>{
//                 observer.next({
//                     latitude: position.coords.latitude,
//                     longitude: position.coords.longitude
//                 });
//                 observer.complete();
//             },
//                 error =>{
//                     observer.error(error)
//                 }
//             )
//         })
//     ).pipe(share())
// }