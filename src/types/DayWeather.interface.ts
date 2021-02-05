import { HourlyWeather } from "./HourlyWeather.interface";

export interface DayWeather{
    date: string,
    astronomy: [
        {
        sunrise: string,
        sunset: string,
        moonrise: string,
        moonset: string,
        moon_phase: string,
        moon_illumination: string
        }
    ],
    maxtempC: string,
    maxtempF: string,
    mintempC: string,
    mintempF: string,
    avgtempC: string,
    avgtempF: string,
    totalSnow_cm: string,
    sunHour: string,
    uvIndex: string,
    hourly: HourlyWeather[]
}