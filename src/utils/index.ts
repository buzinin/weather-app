import {City as CityInterface, CityPosition} from "@/types/src/RootState";

export const debounce = (f: Function, ms: number): Function => {
  let timer = null;
  return  (...args) => {
    const onComplete = () => {
      f.apply(this, args);
      timer = null;
    };
    if (timer) clearTimeout(timer);
    timer = setTimeout(onComplete, ms);
  };
};

export function getPosition(): Promise<CityPosition> {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  })
    .then(res => {
      const {latitude: lat, longitude: lon} = (res as any).coords;
      return {code: 200, lat, lon};
    })
    .catch(err => {
      return {code: err.code, lat: null, lon: null,};
    })
}

export function checkLocation(location, query) {
  try{
    if (!location.type) return true;
    return /^(city|town)$/.test(location.type);
  }catch (e) {
    return false;
  }
}

export class City implements CityInterface {
  public id: number;
  public value: string;
  public label: string;
  public lat: number;
  public lon: number;
  public weather: any;

  constructor(location) {
    try{
      const {place_id: id, lat, lon} = location;
      const {country, state, city} =  location.address;
      const normalizedCountry = (country === 'РФ') ? 'Россия' : country;
      const label = state + ', ' + normalizedCountry;

      this.id = id;
      this.value = city;
      this.label = label;
      this.lat = lat;
      this.lon = lon;
      this.weather = null;
    }catch (e) {
      return null;
    }
  }
}