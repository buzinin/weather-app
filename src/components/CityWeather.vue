<template lang="pug">
  .city
    .city-name {{city.value}}
    .city-name__label {{city.label}}
    .city-weather
      .city-weather__state
        .city-weather__icon
          img(:src="`./img/weather-icon/${icon}.svg`")

        .city-weather__temp {{Math.round(weather.main.temp)}}°C
        .city-weather__desc {{weather.weather[0].description}}

        .city-weather__info
          .city-weather__wind {{weather.wind.speed}} М/с
          .city-weather__humidity {{weather.main.humidity}}%
          .city-weather__pressure {{Math.round(weather.main.pressure / 1.333)}} мм. рт. ст


</template>

<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator';
  import {City} from "@/types/src/RootState";

  @Component
  export default class CityWeather extends Vue {
    @Prop() city: City;

    get weather() {
      return this.city.weather;
    }

    get icon() {
      return this.weather.weather[0].icon;
    }

    checkTimestamp() {
      const currenetTime = Date.now();
      const timeDifference = currenetTime - (this.weather.dt * 1000);
      const hour = 60 * 60 *1000;
      return Math.floor(timeDifference / hour);
    }

    mounted() {
      this.checkTimestamp();
    }
  }
</script>

<style>
  .city {

  }

  .city-name {
    font-size: 24px;
    font-weight: 400;
    line-height: 1;
    color: #fff;
    text-align: center;
  }

  .city-name__label {
    font-size: 14px;
    font-weight: 400;
    line-height: 1.15;
    color: #fff;
    text-align: center;
  }


  .city-weather {
    padding-top: 32px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .city-weather__state {
    width: 340px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .city-weather__icon {
    width: 100%;
    height: 100px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    text-align: center;

    img {
      width: 100px;
      height: 100%;
    }
  }

  .city-weather__temp {
    display: inline-block;
    font-size: 70px;
    font-weight: 400;
    line-height: 1;
    letter-spacing: -4px;
  }

  .city-weather__desc {
    width: 100%;
    font-size: 16px;
    line-height: 1;
    text-align: center;
  }

  .city-weather__info {
    width: 100%;
    margin-top: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }

  .city-weather__wind {
    margin-right: 16px;
    padding-left: 40px;
    background: url("../assets/img/wind.svg") no-repeat left center / 32px;
  }

  .city-weather__humidity {
    margin-right: 16px;
    padding-left: 26px;
    background: url("../assets/img/humidity.svg") no-repeat -5px center / 32px;
  }

  .city-weather__pressure {
    padding-left: 26px;
    background: url("../assets/img/pressure.svg") no-repeat -5px center / 32px;
  }
</style>