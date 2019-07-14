import axios from 'axios';
import i18n from '../i18n';
import {City, checkLocation} from "@/utils";

const geocoder = axios.create({
  baseURL: 'https://eu1.locationiq.com/v1',
  params: {
    key: 'b0d4c38e2f7693',
    format: 'json',
    addressdetails: 1,
    normalizecity: 1,
    zoom: 10
  }
});

geocoder.interceptors.response.use((res) => {
  return res;
}, (err) => {
  // Здесь можно отправлять ошибки например в Raven
  return Promise.reject(err);
});

const weather = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    APPID: '89c56f6b59002f9ebaa851d4f8bd08bd',
  }
});

const searchCity = function (query) {
  return geocoder.get('/search.php', {
    params: {
      language: i18n.locale,
      city: query
    }
  }).then(res => {
    return res.data.reduce((acc, item) => {
      return checkLocation(item, query) ? acc.concat(new City(item)) : acc;
    }, []);
  }).catch(() => []);
};

const getCity = function ({lat, lon}) {
  return geocoder.get('/reverse.php', {
    params: {
      language: i18n.locale,
      lat: lat,
      lon: lon,
    }
  }).then(res => {
    return new City(res.data);
  }).catch(() => null);
};


const getWeather = function ({lat, lon}) {
  return weather.get('/weather', {
    params: {
      lat: lat,
      lon: lon,
      lang: i18n.locale,
      units: 'metric',
    }
  })
    .then(res => res.data)
};

const getForecast = function ({lat, lon}) {
  return weather.get('/forecast', {
    params: {
      lat: lat,
      lon: lon,
      lang: i18n.locale,
      units: 'metric',
    }
  })
    .then(res => res.data)
};



export default {
  getWeather,
  getForecast,
  getCity,
  searchCity
}
