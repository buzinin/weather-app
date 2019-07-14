export interface  City {
  id: number,
  value: string,
  fullName: string;
  label: string,
  lat: number,
  lon: number,
  weather: any,
  forecast: any
}

export interface CityPosition {
  code: number,
  lat: number,
  lon: number,
}

export interface RootState {
  lang: string;
  cityIndex: number;
  cities: City[]
}

