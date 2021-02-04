export interface CurrentCondition
{
    observation_time: string,
    isdaytime: string,
    temp_C: string,
    temp_F: string,
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
    windspeedMiles: string,
    windspeedKmph: string,
    winddirDegree: string,
    winddir16Point: string,
    precipMM: string,
    precipInches: string,
    humidity: string,
    visibility: string,
    visibilityMiles: string,
    pressure: string,
    pressureInches: string,
    cloudcover: string,
    FeelsLikeC: string,
    FeelsLikeF: string,
    uvIndex: string
}

