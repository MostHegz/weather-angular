import { CurrentCondition } from "./CurrentConditions.interface";
import { DayWeather } from "./dayWeather.interface";
import { MonthlyClimate } from "./MonthlyClimate.interface";

export interface AverageClimateData{
    data: {
        request: [
            {
            type: string,
            query: string
            }
        ],
        nearest_area: [
            {
                areaName: [
                    {
                    value: string
                    }
                ],
                country: [
                    {
                    value: string
                    }
                ],
                region: [
                    {
                    value: string
                    }
                ],
                latitude: string,
                longitude: string,
                population: string,
                weatherUrl: [
                    {
                    value: string
                    }
                ]
            }
        ],
        current_condition: CurrentCondition[],
        weather: DayWeather[],
        ClimateAverages: [
            {
                month: MonthlyClimate[]
            }
        ]
    }
}