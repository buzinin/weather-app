<template lang="pug">
  .home(:class="`is-${time}`")
    Header(@openDrawer="toggleDrawer")
    Main
      CityWeather(slot="cities" :city="currentCity")
    transition(name="side-right")
      Drawer(v-if="drawer" @close="toggleDrawer")


</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Action, Getter, Mutation } from 'vuex-class';
import Header from '../components/Header.vue';
import Main from '../components/Main.vue';
import CityWeather from '@/components/CityWeather.vue';
import Drawer from "@/components/Drawer.vue";

@Component({
  components: {
    Drawer,
    CityWeather,
    Header,
    Main
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
    this.getTime()
  }
}
</script>

<style>
  .home {
    background: #03A9F4;
  }

  .is-night {
    background: linear-gradient(to right, #2980b9, #2c3e50);
  }

  .is-evening {
    background: linear-gradient(to bottom, #0b486b, #f56217);
  }

  .side-right-enter-active,
  .side-right-leave-active {
    transition: transform 0.3s ease-in-out;
  }
  .side-right-enter,
  .side-right-leave-to {
    transform: translateX(100%);
  }
</style>
