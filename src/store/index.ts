import Vue from 'vue';
import Vuex, {StoreOptions} from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import {weather} from '@/store/modules/weather';
import {RootState, City, CityPosition} from "@/types/src/RootState";
import api from "@/api";
import {getPosition} from "@/utils";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  plugins: [createPersistedState()],
  state: {
    lang: 'ru',
    cities: [],
    cityIndex: 0,
  },
  getters: {
    currentCity(state): City {
      try {
        return state.cities[state.cityIndex];
      } catch (e) {
        return null;
      }
    },
    isWeather(state, getters) {
      try {
        const city = getters.currentCity;
        const hasWeather = !!city.weather;

        return city && hasWeather;
      } catch (e) {
        return null;
      }
    }
  },
  mutations: {
    addCity(state, payload: City) {
      state.cities.push(payload);
    },
    removeCity(state, payload: number) {
      state.cities.splice(payload, 1);
    },
    setCityIndex(state, value: number) {
      state.cityIndex = value;
    },
    setWeather(state, value) {
      state.cities[state.cityIndex].weather = value;
    },
    setForecast(state, value) {
      state.cities[state.cityIndex].forecast = value;
    }
  },
  actions: {
    getCityByPosition({commit, dispatch}, position: CityPosition) {
      return getPosition()
        .then(res => {
          if (res.code === 200 ) {
            const {lat, lon} = res;
            return api.getCity({lat, lon});
          }

          return Promise.reject(res.code);
        });
    },

    getCityByName({commit}, query: string) {
      return api.searchCity(query);
    },


    addCity({commit, dispatch, state}, city: City) {
      const newCity = {...city};
      console.log(state.cities.some(city => city.id === newCity.id));
      if (state.cities.some(city => city.id === newCity.id)) return;

      return api.getWeather(city)
        .then(res => {
          newCity.weather = res;
          return api.getForecast(newCity);
        })
        .then(res => {
          newCity.forecast = res.list;
          commit('setCityIndex', state.cities.length);
          commit('addCity', newCity);
        })
    },

    removeCity({commit, state}, index) {
      commit('removeCity', index);
      const last = state.cities.length - 1;
      if (index > last) index = last;
      commit('setCityIndex', index);
    }
  },
  modules: {
    weather,
  }
};

export default new Vuex.Store<RootState>(store);
