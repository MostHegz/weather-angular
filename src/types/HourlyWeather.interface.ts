export interface HourlyWeather
{
    time: string,
    tempC: string,
    tempF: string,
    windspeedMiles: string,
    windspeedKmph: string,
    winddirDegree: string,
    winddir16Point: string,
    weatherCode: string,
    weatherIconUrl: [
        {
        value: string
        }
    ],
    weatherDesc: [
        {
        value: string
        }
    ],
    precipMM: string,
    precipInches: string,
    humidity: string,
    visibility: string,
    visibilityMiles: string,
    pressure: string,
    pressureInches: string,
    cloudcover: string,
    HeatIndexC: string,
    HeatIndexF: string,
    DewPointC: string,
    DewPointF: string,
    WindChillC: string,
    WindChillF: string,
    WindGustMiles: string,
    WindGustKmph: string,
    FeelsLikeC: string,
    FeelsLikeF: string,
    chanceofrain: string,
    chanceofremdry: string,
    chanceofwindy: string,
    chanceofovercast: string,
    chanceofsunshine: string,
    chanceoffrost: string,
    chanceofhightemp: string,
    chanceoffog: string,
    chanceofsnow: string,
    chanceofthunder: string,
    uvIndex: string
}