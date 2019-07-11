export interface  City {
  id: number,
  value: string,
  label: string,
  lat: number,
  lon: number,
  weather: any
}

export interface CityPosition {
  code: number,
  lat: number,
  lon: number,
}

export interface RootState {
  cityIndex: number;
  cities: City[]
}

