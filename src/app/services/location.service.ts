import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { switchMap , share } from "rxjs/operators";
import { IPData } from "src/types/IPData.interface";
import { WeatherData } from "src/types/WeatherData.Interface";
import { searchApiInterface } from "src/types/searchApi.interface";
import { AverageClimateData } from "src/types/AverageClimateData.interface";

@Injectable()
export class LocationService{
    locationObservable: Observable<IPData> = this.getLocationByIP();
    weatherObservableFromIp: Observable<WeatherData> = this.locationObservable
        .pipe(
            switchMap((ipData: IPData) =>
                {
                    return this.getWeatherByIp(ipData.ip);
                }
            ),
            share()
    )

    // weatherObservablefromCity: Observable<WeatherData> = this.getWeatherByLocation();

    constructor(private http:HttpClient){}
        
    getLocationByIP(){
        return this.http
            .get<IPData>(`https://geo.ipify.org/api/v1?apiKey=${environment.ipApiKey}`);
    }
    getWeatherByLocation(city: string, country: string){
        return this.http
            .get<WeatherData>(`http://api.worldweatheronline.com/premium/v1/weather.ashx?key=${environment.weatherApiKey}&q=${city},${country}&num_of_days=1&includelocation=yes&fx=no&mca=no&extra=isDayTime&format=json`)
            .pipe(share())
    }
    getWeatherByIp(ipAddress: string){
        return this.http.get<WeatherData>(`http://api.worldweatheronline.com/premium/v1/weather.ashx?key=${environment.weatherApiKey}&q=${ipAddress}&num_of_days=1&includelocation=yes&fx=no&mca=no&extra=isDayTime&format=json`)
    }
    getClimateAveragesByLocation(city: string, country: string){
        return this.http
            .get<AverageClimateData>(`http://api.worldweatheronline.com/premium/v1/weather.ashx?key=${environment.weatherApiKey}&q=${city},${country}&format=json&num_of_days=2&fx=yes&mca=yes&includelocation=yes`)
            .pipe(share())
    }
    getSearchLocation(country: string, city: string){
        return this.http
            .get<searchApiInterface>(`http://api.worldweatheronline.com/premium/v1/search.ashx?key=${environment.weatherApiKey}&q=${city},${country}&format=json&num_of_results=50`)
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