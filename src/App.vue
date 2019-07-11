<template lang="pug">
  #weather-app
    RouterView(v-if="isWeather")
    CitySelect(v-else)
</template>

<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator';
  import { State, Action, Getter, Mutation } from 'vuex-class';
  import CitySelect from '@/views/CityFind.vue';
  import api from './api'
  import axios from 'axios';

  @Component({
    components: {
      CitySelect
    }
  })
  export default class App extends Vue {
    @Getter isWeather;

    created() {
      this.$loader.show({message: 'Загрузка'});
      window.onfocus = () => {
        console.log('focus')
      };



      /*api.get('http://api.openweathermap.org/data/2.5/forecast', {
        params: {
          lat: 55.7504461,
          lon: 37.6174943,
          lang: 'ru',
          cnt: 60,
          units: 'metric',
          APPID: '89c56f6b59002f9ebaa851d4f8bd08bd'
        }
      })*/
    }

  }
</script>

<style>

</style>
