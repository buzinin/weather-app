<template lang="pug">
  .forecast
    .forecast-list
      .forecast-item(v-for="item in dayForecast")
        .forecast-item__tiem {{item.time}}
        .forecast-item__icon
          img(:src="`./img/weather-icon/${item.icon}.svg`")
        .forecast-item__temp {{item.temp}}°





</template>

<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator';
  import {City} from "@/types/src/RootState";
  import dayjs from 'dayjs';

  @Component
  export default class CityForecast extends Vue {
    @Prop() city: City;

    get weather() {
      return this.city.weather;
    }

    get forecast() {
      return this.city.forecast;
    }

    get dayForecast() {
      return this.forecast.slice(0, 5).map(item => {
        const hour = dayjs(item.dt_txt).format('HH');
        return {
          time: `${hour}:00`,
          icon: item.weather[0].icon,
          temp: Math.round(item.main.temp)
        }
      })
    }

    first() {
      const hour = dayjs(this.dayForecast[0].dt_txt).format('HH');
      console.log(hour);
    }

    checkTimestamp() {
      const currenetTime = Date.now();
      const timeDifference = currenetTime - (this.weather.dt * 1000);
      const hour = 60 * 60 *1000;
      return Math.floor(timeDifference / hour);
    }

    mounted() {
      this.first();
      this.checkTimestamp();
    }
  }
</script>

<style>
  .forecast {
    padding: 16px;
    margin: 0 auto;
    /*background: #fff;*/
    border-radius: 4px;
  }

  .forecast-list {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .forecast-item {
    text-align: center;
    color: #fff;

    & + .forecast-item {
      margin-left: 24px;
    }
  }

  .forecast-item__icon {
    width: 30px;
    height: 30px;
    display: inline-block;

    img {
      width: 100%;
      height: 100%;
      display: inline-block;
    }
  }
</style>