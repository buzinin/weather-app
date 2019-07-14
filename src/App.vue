<template lang="pug">
  #weather-app
    RouterView(v-if="isWeather")
    CitySelect(v-else)
</template>

<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator';
  import { State, Action, Getter, Mutation } from 'vuex-class';
  import CitySelect from '@/views/CityFind.vue';
  import dayjs from 'dayjs';
  import 'dayjs/locale/en';
  import 'dayjs/locale/ru';
  import api from './api'
  import axios from 'axios';

  // TODO в CityListItem добавить дропдаун (изменить, удалить и т.п.)
  // TODO сделать анимированные иконки (дождь, снег)
  // TODO фильтр списка городов
  // TODO в ПК-версии большая кнопка добавить город
  // TODO продумать как сделать подробный прогноз (отдельная страница, или просто блок)
  // TODO добавить перевод едениц измерения (ветер, температура)
  // TODO добавить настройки
  // TODO добавить обновление погоды
  // TODO добавить service worker (установка, пуш-уведомления в указанный интервал)
  // TODO проверить обработку запрета на использование GPS в мобилках

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

    }

  }
</script>

<style>

</style>
