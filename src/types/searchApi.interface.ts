import { searchResultInterface } from "./searchResult.interface";

export interface searchApiInterface{
    search_api: {
        result: searchResultInterface[]
    }
}