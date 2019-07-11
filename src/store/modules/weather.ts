import {MutationTree, GetterTree, ActionTree, Module} from 'vuex/types'
import {WeatherState} from "@/types/src/WeatherState";
import { RootState } from "@/types/src/RootState";



const state: WeatherState  = {
  city: ''
};

const getters: GetterTree<WeatherState, RootState> = {

};

const mutations: MutationTree<WeatherState> = {

};

const actions: ActionTree<WeatherState, RootState> = {

};

export const weather: Module<WeatherState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};