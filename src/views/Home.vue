<template lang="pug">
  .home(:class="`is-${time}`")
    //WeatherCanvas
    Header(@openDrawer="toggleDrawer")
    Weather
      CityWeather(slot="body" :city="currentCity")
      CityForecast(slot="footer" :city="currentCity")
    transition(name="side-right")
      Drawer(v-show="drawer" @close="toggleDrawer")



</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Action, Getter, Mutation } from 'vuex-class';
import api from '../api'
import Header from '../components/Header.vue';
import Weather from '../components/Weather.vue';
import CityWeather from '@/components/CityWeather.vue';
import CityForecast from '@/components/CityForecast.vue';
import Drawer from "@/components/Drawer.vue";
import WeatherCanvas from "@/components/WeatherCanvas.vue";

@Component({
  components: {
    WeatherCanvas,
    Drawer,
    CityWeather,
    CityForecast,
    Header,
    Weather
  },
})
export default class Home extends Vue {
  @State cities;
  @Getter currentCity;

  time: string = '';
  drawer = false;

  toggleDrawer(value: boolean): void {
    this.drawer = value;
  }

  getTime() {
    const hours = new Date().getHours();
    if (hours >= 18 && hours <= 23) {
       this.time = 'evening';
     }
     else if(hours >= 0 && hours < 6) {
       this.time = 'night';
     }
     else if(hours >= 6 && hours < 12) {
       this.time = 'morning';
     }
     else {
       this.time = 'day'
     }
  }

  mounted() {
    api.getForecast(this.currentCity);
    this.getTime()
  }
}
</script>

<style>
  .home {
    background: #03A9F4;
    background: linear-gradient(to right, #56ccf2, #2f80ed);
  }
  /*

  .is-night {
    background: linear-gradient(to right, #2980b9, #2c3e50);
  }

  .is-evening {
    background: linear-gradient(to bottom, #0b486b, #f56217);
  }

 */

  .side-right-enter-active,
  .side-right-leave-active {
    transition: transform 0.3s ease-in-out;
  }
  .side-right-enter,
  .side-right-leave-to {
    transform: translateX(100%);
  }
</style>
