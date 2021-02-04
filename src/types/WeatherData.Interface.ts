import { CurrentCondition } from "./CurrentConditions.interface";

export interface WeatherData{
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
        current_condition: CurrentCondition[]
        }
}