import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IpServiceService {

  constructor(private http:HttpClient) {}
  public getIPAddress(){
    return this.http.get(`https://geo.ipify.org/api/v1?apiKey=${environment.ipApiKey}`);
  }
}
